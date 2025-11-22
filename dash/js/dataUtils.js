window.parseCsv = function(text){
  return new Promise((res)=>{
    Papa.parse(text,{
      header:true,
      skipEmptyLines:true,
      dynamicTyping:false,
      complete:(p)=>res(p.data)
    });
  });
};

window.toNum = function(v){
  if(v===null||v===undefined||v==='') return 0;
  return Number(String(v).replace(/,/g,'')) || 0;
};

window.parseDateFlexible = function(v){
  if(v===null||v===undefined||v==='') return null;
  const s = String(v).trim();
  const t = Date.parse(s);
  if(!isNaN(t)) return new Date(t);

  const parts = s.match(/(\d{1,4})[\-\/\.](\d{1,2})[\-\/\.](\d{1,4})/);
  if(parts){
    if(parts[1].length===4){
      const y=Number(parts[1]), m=Number(parts[2])-1, d=Number(parts[3]);
      const dt = new Date(y,m,d); if(!isNaN(dt)) return dt;
    }else{
      const d=Number(parts[1]), m=Number(parts[2])-1, y=Number(parts[3]);
      const dt = new Date(y,m,d); if(!isNaN(dt)) return dt;
    }
  }

  if(/^[0-9]+(\.[0-9]+)?$/.test(s)){
    const num = Number(s);
    if(num > 1e12){
      let ms = num;
      if(num > 1e17) ms = Math.round(num/1e6);
      else if(num > 1e12 && num < 1e15) ms = Math.round(num/1000);
      const dt = new Date(ms); if(!isNaN(dt)) return dt;
    }
    if(num > 59 && num < 2958465){
      const excelEpoch = new Date(Date.UTC(1899,11,30));
      const dt = new Date(excelEpoch.getTime()+Math.round(num)*86400000);
      if(!isNaN(dt)) return dt;
    }
    const dt2 = new Date(num); if(!isNaN(dt2)) return dt2;
  }
  return null;
};

window.normalizeRowDates = function(rows){
  const map={};
  rows.forEach(r=>{
    r._originalDate = r.Date==null? '' : String(r.Date);
    const d = window.parseDateFlexible(r.Date);
    if(d){
      r._date_iso = d.toISOString().slice(0,10);
      if(!map[r._date_iso]) map[r._date_iso] = r._originalDate;
    }else r._date_iso=null;
  });
  return map;
};

window.computeDateRangeFromPreset = function(preset){
  const today=new Date();
  if(preset==='all') return {from:'',to:''};
  if(preset==='month'){
    const y=today.getFullYear(), m=today.getMonth();
    const first=new Date(y,m,1), last=new Date(y,m+1,0);
    return {from:first.toISOString().slice(0,10),to:last.toISOString().slice(0,10)};
  }
  const days=Number(preset);
  if(!isNaN(days)&&days>0){
    const to=today, from=new Date(); from.setDate(today.getDate()-(days-1));
    return {from:from.toISOString().slice(0,10),to:to.toISOString().slice(0,10)};
  }
  return {from:'',to:''};
};

window.aggregate = function(rows, platformFilter, dateFrom, dateTo){
  // فلترة الصفوف حسب المنصة والفترة الزمنية
  const filtered = rows.filter(r => {
    if (platformFilter && platformFilter !== 'All' && r.Platform !== platformFilter) return false;

    if (dateFrom) {
      const d = window.parseDateFlexible(r._originalDate || r.Date);
      if (d === null) return false;
      if (d.getTime() < new Date(dateFrom).getTime()) return false;
    }

    if (dateTo) {
      const d = window.parseDateFlexible(r._originalDate || r.Date);
      if (d === null) return false;
      if (d.getTime() > new Date(dateTo).getTime()) return false;
    }

    return true;
  });

  // ========== إجماليات عامة ==========
  const totalSpend       = filtered.reduce((s,r)=>s+window.toNum(r['Amount Spent']),0);
  const totalImpr        = filtered.reduce((s,r)=>s+window.toNum(r['Impressions']),0);
  const totalPurch       = filtered.reduce((s,r)=>s+window.toNum(r['Purchases']),0);
  const totalValue       = filtered.reduce((s,r)=>s+window.toNum(r['Purchase Value']),0);
  const totalClicks      = filtered.reduce((s,r)=>s+window.toNum(r['Link Clicks']),0);
  const totalLandingView = filtered.reduce((s,r)=>s+window.toNum(r['Landing View']),0);
  const totalATC         = filtered.reduce((s,r)=>s+window.toNum(r['Add to Carts']),0);
  // إضافة Initiate Checkout هنا
  const totalInitiateCheckout = filtered.reduce((s,r)=>s+window.toNum(r['Initiate Checkout']),0);
  const totalFreq        = filtered.reduce((s,r)=>s+window.toNum(r['Frequency']),0);
  const totalReach       = filtered.reduce((s,r)=>s+window.toNum(r['Reach']),0);
  const totalCount       = filtered.length;

  // نعدّ عدد الأيام المميّزة في البيانات (لـ avg per day)
  const daySet = new Set();
  filtered.forEach(r => {
    if (r._date_iso && r._date_iso !== 'Unknown') {
      daySet.add(r._date_iso);
    }
  });
  const totalDays = daySet.size || 1; // علشان ما نقسمش على صفر

  // ========== تايم سيريز ==========
  const byDate = {};
  filtered.forEach(r => {
    const key = r._date_iso || 'Unknown';
    if (!byDate[key]) byDate[key] = { AmountSpent:0, Purchases:0, Impressions:0 };
    byDate[key].AmountSpent += window.toNum(r['Amount Spent']);
    byDate[key].Purchases   += window.toNum(r['Purchases']);
    byDate[key].Impressions += window.toNum(r['Impressions']);
  });

  const timeseries = Object.keys(byDate).sort().map(k => ({ Date:k, ...byDate[k] }));
  const validDates = timeseries.filter(x => x.Date !== 'Unknown');
  const finalTimeseries = validDates.length ? validDates : (timeseries.length ? [timeseries[0]] : []);

  // ========== تجميع حسب المنصة ==========
  const byPlatform = {};
  const platformDaySets = {}; // لكل منصة Set بالأيام بتاعتها

  filtered.forEach(r => {
    const p = r.Platform || 'unknown';
    if (!byPlatform[p]) {
      byPlatform[p] = {
        Platform: p,
        AmountSpent: 0,
        Impressions: 0,
        Reach: 0,
        LinkClicks: 0,
        LandingView: 0,
        AddToCarts: 0,
        InitiateCheckout: 0, // إضافة الحقل هنا
        Purchases: 0,
        PurchaseValue: 0,
        FrequencySum: 0,
        Count: 0
      };
      platformDaySets[p] = new Set();
    }

    byPlatform[p].AmountSpent    += window.toNum(r['Amount Spent']);
    byPlatform[p].Impressions    += window.toNum(r['Impressions']);
    byPlatform[p].Reach          += window.toNum(r['Reach']);
    byPlatform[p].LinkClicks     += window.toNum(r['Link Clicks']);
    byPlatform[p].LandingView    += window.toNum(r['Landing View']);
    byPlatform[p].AddToCarts     += window.toNum(r['Add to Carts']);
    // تجميع Initiate Checkout لكل منصة
    byPlatform[p].InitiateCheckout += window.toNum(r['Initiate Checkout']);
    byPlatform[p].Purchases      += window.toNum(r['Purchases']);
    byPlatform[p].PurchaseValue  += window.toNum(r['Purchase Value']);
    byPlatform[p].FrequencySum   += window.toNum(r['Frequency']);
    byPlatform[p].Count          += 1;

    if (r._date_iso && r._date_iso !== 'Unknown') {
      platformDaySets[p].add(r._date_iso);
    }
  });

  const platformArr = Object.values(byPlatform).map(m => {
    const platDays = (platformDaySets[m.Platform] && platformDaySets[m.Platform].size) || 1;

    const CTR          = m.Impressions ? (m.LinkClicks / m.Impressions) : 0;
    const CPC          = m.LinkClicks  ? (m.AmountSpent / m.LinkClicks) : 0;
    const CPM          = m.Impressions ? (m.AmountSpent / m.Impressions) * 1000 : 0;
    const ROAS         = m.AmountSpent ? (m.PurchaseValue / m.AmountSpent) : 0;
    const PurchaseRate = m.LandingView ? (m.Purchases / m.LandingView) : 0;
    const ATCRate      = m.LandingView ? (m.AddToCarts / m.LandingView) : 0;
    const AvgFrequency = m.Count       ? (m.FrequencySum / m.Count) : 0;

    const AvgOrdersPerDay = m.Purchases     ? (m.Purchases / platDays) : 0;
    const AvgATCPerDay    = m.AddToCarts    ? (m.AddToCarts / platDays) : 0;
    const AvgSalesPerDay  = m.PurchaseValue ? (m.PurchaseValue / platDays) : 0;
    const AOV             = m.Purchases     ? (m.PurchaseValue / m.Purchases) : 0;
    const CPA             = m.Purchases     ? (m.AmountSpent   / m.Purchases) : 0;

    return {
      ...m,
      CTR,
      CPC,
      CPM,
      ROAS,
      PurchaseRate,
      ATCRate,
      AvgFrequency,
      AvgOrdersPerDay,
      AvgATCPerDay,
      AvgSalesPerDay,
      AOV,
      CPA
    };
  });

  // ========== ميتريكس إجمالية (All) ==========
  const overallMetrics = {
    Platform: 'All',
    AmountSpent: totalSpend,
    Impressions: totalImpr,
    Reach: totalReach,
    LinkClicks: totalClicks,
    LandingView: totalLandingView,
    AddToCarts: totalATC,
    InitiateCheckout: totalInitiateCheckout, // إضافتها هنا أيضاً
    Purchases: totalPurch,
    PurchaseValue: totalValue,
    FrequencySum: totalFreq,
    Count: totalCount,
  };

  overallMetrics.CTR          = overallMetrics.Impressions ? (overallMetrics.LinkClicks / overallMetrics.Impressions) : 0;
  overallMetrics.CPC          = overallMetrics.LinkClicks  ? (overallMetrics.AmountSpent / overallMetrics.LinkClicks) : 0;
  overallMetrics.CPM          = overallMetrics.Impressions ? (overallMetrics.AmountSpent / overallMetrics.Impressions) * 1000 : 0;
  overallMetrics.ROAS         = overallMetrics.AmountSpent ? (overallMetrics.PurchaseValue / overallMetrics.AmountSpent) : 0;
  overallMetrics.PurchaseRate = overallMetrics.LandingView ? (overallMetrics.Purchases / overallMetrics.LandingView) : 0;
  overallMetrics.ATCRate      = overallMetrics.LandingView ? (overallMetrics.AddToCarts / overallMetrics.LandingView) : 0;
  overallMetrics.AvgFrequency = overallMetrics.Count       ? (overallMetrics.FrequencySum / overallMetrics.Count) : 0;

  // ميتريكس per day على مستوى All
  overallMetrics.AvgOrdersPerDay = totalPurch     ? (totalPurch     / totalDays) : 0;
  overallMetrics.AvgATCPerDay    = totalATC       ? (totalATC       / totalDays) : 0;
  overallMetrics.AvgSalesPerDay  = totalValue     ? (totalValue     / totalDays) : 0;
  overallMetrics.AOV             = totalPurch     ? (totalValue     / totalPurch) : 0;
  overallMetrics.CPA             = totalPurch     ? (totalSpend     / totalPurch) : 0;

  return {
    totalSpend,
    totalImpr,
    totalPurch,
    totalValue,
    timeseries: finalTimeseries,
    platformArr,
    overallMetrics,
    filtered,
  };
};