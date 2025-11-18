/* app.js - Full static dashboard logic
   - Uses PapaParse to parse CSV
   - Uses Plotly for charts
   - Expects CSV columns:
     date,platform,spend,impressions,reach,clicks,landing_page_views,add_to_cart,begin_checkout,purchases,revenue,frequency
   - All computation client-side. Keep CSV public if using raw GitHub URL or Google Sheets export.
*/

// ---------- Utility & State ----------
let rawRows = [];  // original parsed rows (array of objects)
let kpis = [];     // aggregated records per platform+date
let signals = [];  // signals with rolling windows and scores

// helpers
function msg(str){ document.getElementById('content').innerHTML = `<div class="card">${str}</div>`; }
function formatDate(d){ // Date object or string -> YYYY-MM-DD
  if (!d) return '';
  const dt = (d instanceof Date) ? d : new Date(d);
  return dt.toISOString().slice(0,10);
}

// ---------- CSV Parsing & Schema normalization ----------
function parseCSVText(text){
  const res = Papa.parse(text, { header:true, dynamicTyping:true, skipEmptyLines:true, transformHeader:h=>h.trim().toLowerCase() });
  return res.data;
}

function normalizeRows(rows){
  // ensure required fields exist and typed
  const required = ['date','platform','spend','impressions','reach','clicks','landing_page_views','add_to_cart','begin_checkout','purchases','revenue','frequency'];
  return rows.map(r=>{
    const out = {};
    // normalize keys to lowercase trimmed (Papa did some)
    Object.keys(r).forEach(k=> {
      const kk = k.trim().toLowerCase();
      out[kk] = r[k];
    });
    // mapping common alternatives
    if (out['lpv'] && !out['landing_page_views']) out['landing_page_views'] = out['lpv'];
    if (out['atc'] && !out['add_to_cart']) out['add_to_cart'] = out['atc'];
    if (out['checkout'] && !out['begin_checkout']) out['begin_checkout'] = out['checkout'];
    // fill required
    required.forEach(c=>{
      if (out[c] === undefined || out[c] === null || out[c] === '') {
        // default 0 except date/platform
        out[c] = (c==='date' || c==='platform') ? out[c] : 0;
      }
    });
    // parse date strictly (allow YYYY-MM-DD or ISO)
    try {
      out.date = new Date(out.date);
      if (isNaN(out.date.getTime())) out.date = null;
    } catch(e){ out.date = null; }
    // numbers
    ['spend','impressions','reach','clicks','landing_page_views','add_to_cart','begin_checkout','purchases','revenue','frequency'].forEach(c=>{
      out[c] = Number(out[c]) || 0;
    });
    out.platform = (out.platform || 'Unknown').toString();
    return out;
  }).filter(r=> r.date !== null && r.platform);
}

// ---------- Aggregation: group by platform + date ----------
function computeKPIs(rows){
  const map = new Map();
  rows.forEach(r=>{
    const key = `${r.platform}__${formatDate(r.date)}`;
    if (!map.has(key)){
      map.set(key, {platform:r.platform, date:new Date(r.date), spend:0, impressions:0, reach:0, clicks:0, landing_page_views:0, add_to_cart:0, begin_checkout:0, purchases:0, revenue:0, freq_sum:0, freq_count:0});
    }
    const entry = map.get(key);
    entry.spend += r.spend;
    entry.impressions += r.impressions;
    entry.reach += r.reach;
    entry.clicks += r.clicks;
    entry.landing_page_views += r.landing_page_views;
    entry.add_to_cart += r.add_to_cart;
    entry.begin_checkout += r.begin_checkout;
    entry.purchases += r.purchases;
    entry.revenue += r.revenue;
    if (!isNaN(r.frequency) && r.frequency>0){
      entry.freq_sum += r.frequency;
      entry.freq_count += 1;
    }
  });
  const arr = Array.from(map.values()).map(e=>{
    const freq = e.freq_count>0 ? e.freq_sum / e.freq_count : 0;
    const ctr = e.impressions>0 ? e.clicks / e.impressions : null;
    const cpm = e.impressions>0 ? e.spend / (e.impressions/1000) : null;
    const cpc = e.clicks>0 ? e.spend / e.clicks : null;
    const atc_rate = e.landing_page_views>0 ? e.add_to_cart / e.landing_page_views : null;
    const checkout_rate = e.add_to_cart>0 ? e.begin_checkout / e.add_to_cart : null;
    const purchase_rate = e.begin_checkout>0 ? e.purchases / e.begin_checkout : null;
    const funnel_conv = e.clicks>0 ? e.purchases / e.clicks : null;
    const cpa = e.purchases>0 ? e.spend / e.purchases : null;
    const roas = e.spend>0 ? e.revenue / e.spend : null;
    return Object.assign({}, e, {
      frequency: +freq.toFixed(3),
      ctr: ctr===null? null : +ctr,
      cpm: cpm===null? null : +cpm,
      cpc: cpc===null? null : +cpc,
      atc_rate: atc_rate===null? null : +atc_rate,
      checkout_rate: checkout_rate===null? null : +checkout_rate,
      purchase_rate: purchase_rate===null? null : +purchase_rate,
      funnel_conv: funnel_conv===null? null : +funnel_conv,
      cpa: cpa===null? null : +cpa,
      roas: roas===null? null : +roas
    });
  });
  // sort by platform then date
  arr.sort((a,b)=> a.platform.localeCompare(b.platform) || a.date - b.date);
  return arr;
}

// ---------- Rolling signals: 7-day & 28-day (per platform) ----------
function computeSignals(kpisArr){
  const grouped = {};
  kpisArr.forEach(r=>{
    if (!grouped[r.platform]) grouped[r.platform] = [];
    grouped[r.platform].push(r);
  });
  const out = [];
  Object.keys(grouped).forEach(platform=>{
    const arr = grouped[platform].sort((a,b)=> a.date - b.date);
    for (let i=0;i<arr.length;i++){
      const row = arr[i];
      const w7 = arr.slice(Math.max(0,i-6), i+1);
      const w28 = arr.slice(Math.max(0,i-27), i+1);
      // average helpers
      const avg = (list, key) => list.reduce((s,x)=> s + (x[key] || 0), 0) / Math.max(1, list.length);
      const ctr7 = avg(w7,'ctr'), ctr28 = avg(w28,'ctr');
      const cpm7 = avg(w7,'cpm'), cpm28 = avg(w28,'cpm');
      const freq7 = avg(w7,'frequency');
      const freq_norm = Math.min(1, Math.max(0, (freq7 - 1) / 3));
      const ctr_drop = (ctr28>0) ? Math.max(0, (ctr28 - ctr7) / ctr28) : 0;
      const cpm_rise = (cpm28>0) ? Math.max(0, (cpm7 - cpm28) / cpm28) : 0;
      const fatigue_score = +(0.5*freq_norm + 0.3*ctr_drop + 0.2*cpm_rise).toFixed(3);
      // opportunity
      const roas7 = avg(w7,'roas'), roas28 = avg(w28,'roas');
      const cpa7 = avg(w7,'cpa'), cpa28 = avg(w28,'cpa');
      const roas_improve = (roas28>0) ? Math.max(0, (roas7 - roas28)/roas28) : 0;
      const cpa_improve = (cpa28>0) ? Math.max(0, (cpa28 - cpa7)/cpa28) : 0;
      const ctr_improve = (ctr28>0) ? Math.max(0, (ctr7 - ctr28)/ctr28) : 0;
      const opportunity_score = +Math.min(1, 0.4*roas_improve + 0.3*cpa_improve + 0.2*ctr_improve).toFixed(3);
      out.push(Object.assign({}, row, {
        ctr_7: +ctr7, ctr_28: +ctr28, cpm_7: +cpm7, cpm_28: +cpm28, freq_7: +freq7,
        fatigue_score, opportunity_score, roas_7: +roas7, roas_28: +roas28, cpa_7: +cpa7, cpa_28: +cpa28
      }));
    }
  });
  // sort combined by date desc
  out.sort((a,b)=> b.date - a.date || a.platform.localeCompare(b.platform));
  return out;
}

// ---------- Alerts generation ----------
function generateAlertsForDate(latestSignals){
  // latestSignals: array of signals for the most recent date across platforms
  const alerts = [];
  latestSignals.forEach(r=>{
    // Fatigue threshold > 0.6
    if (r.fatigue_score !== null && r.fatigue_score > 0.6){
      alerts.push({platform:r.platform, severity:'HIGH', message:`إرهاق إعلاني عالي على ${r.platform} (score=${r.fatigue_score.toFixed(2)})`});
    }
    // sudden LPV drop: we check if LPV today < 75% of 7-day avg lpv
    // (we need the 7-day avg of LPV; signals contain roas_7 etc but not LPV; compute quick)
    // We'll approximate with kpis global
    // Low ROAS
    if (r.roas !== null && r.roas < 0.5) {
      alerts.push({platform:r.platform, severity:'MED', message:`ROAS منخفض على ${r.platform} (roas=${(r.roas||0).toFixed(2)})`});
    }
    // Low purchase_rate
    if (r.purchase_rate !== undefined && r.purchase_rate !== null && r.purchase_rate < 0.02){ // arbitrary low rate
      alerts.push({platform:r.platform, severity:'MED', message:`معدل اتمام البيع منخفض على ${r.platform} (purchase_rate=${(r.purchase_rate||0).toFixed(3)})`});
    }
    // Stable spend but purchase drop detection can be done externally by comparing week-over-week; here we keep simple
  });
  return alerts;
}

// ---------- Rendering: Overview / Funnel / Trends / Health / Data ----------

function renderOverview(){
  const container = document.getElementById('content');
  if (!signals.length) { msg('لا توجد بيانات. حمّل CSV أو استخدم بيانات نموذجية.'); return; }
  // pick latest date
  const latestDate = signals[0].date;
  const latestStr = formatDate(latestDate);
  // reduce by platform for that date
  const latest = signals.filter(s => formatDate(s.date) === latestStr);
  // KPI cards summary (sum across platforms)
  const totals = latest.reduce((acc, r)=> {
    acc.spend += r.spend; acc.revenue += r.revenue; acc.purchases += r.purchases; acc.impressions += r.impressions;
    return acc;
  }, {spend:0,revenue:0,purchases:0,impressions:0});
  // layout HTML
  container.innerHTML = `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><strong>نظرة عامة - ${latestStr}</strong></div>
        <div class="small-muted">البيانات محلية - الحسابات تجري في متصفحك</div>
      </div>
      <div class="kpi-row" style="margin-top:12px">
        <div class="kpi"><div class="label">المجموع المصروف</div><div class="value">${totals.spend.toFixed(2)}</div></div>
        <div class="kpi"><div class="label">إجمالي الإيرادات</div><div class="value">${totals.revenue.toFixed(2)}</div></div>
        <div class="kpi"><div class="label">المعامل ROAS (إجمالي)</div><div class="value">${(totals.revenue / Math.max(1, totals.spend)).toFixed(2)}</div></div>
        <div class="kpi"><div class="label">إجمالي المشتريات</div><div class="value">${totals.purchases}</div></div>
      </div>
    </div>

    <div class="card" id="overview-charts">
      <div id="chart-spend-rev" style="height:340px"></div>
      <div id="chart-fat-op" style="height:320px;margin-top:12px"></div>
    </div>

    <div class="card">
      <h4>تفاصيل المنصات (${latest.length})</h4>
      <div id="platform-table"></div>
    </div>
  `;
  // Plot Spend vs Revenue per platform
  const platforms = latest.map(r=> r.platform);
  const spend = latest.map(r=> r.spend);
  const revenue = latest.map(r=> r.revenue);
  Plotly.newPlot('chart-spend-rev', [
    {x: platforms, y: spend, name:'Spend', type:'bar'},
    {x: platforms, y: revenue, name:'Revenue', type:'bar'}
  ], {title:`Spend vs Revenue — ${latestStr}`, barmode:'group', margin:{t:40}});

  // Fatigue vs Opportunity
  const fatigue = latest.map(r=> r.fatigue_score);
  const opp = latest.map(r=> r.opportunity_score);
  Plotly.newPlot('chart-fat-op', [
    {x: platforms, y: fatigue, name:'Fatigue', type:'bar'},
    {x: platforms, y: opp, name:'Opportunity', type:'bar'}
  ], {title:'Fatigue & Opportunity', barmode:'group', margin:{t:40}});

  // Table
  let tableHtml = `<table class="table"><thead><tr><th>المنصة</th><th>Spend</th><th>Revenue</th><th>ROAS</th><th>CPA</th><th>CTR</th><th>Freq</th><th>Fatigue</th><th>Opportunity</th></tr></thead><tbody>`;
  latest.forEach(r=>{
    tableHtml += `<tr>
      <td>${r.platform}</td>
      <td>${(r.spend||0).toFixed(2)}</td>
      <td>${(r.revenue||0).toFixed(2)}</td>
      <td>${(r.roas||0).toFixed(2)}</td>
      <td>${(r.cpa||0).toFixed(2)}</td>
      <td>${r.ctr!==null? r.ctr.toFixed(4): '-'}</td>
      <td>${(r.frequency||0).toFixed(2)}</td>
      <td>${(r.fatigue_score||0).toFixed(2)}</td>
      <td>${(r.opportunity_score||0).toFixed(2)}</td>
    </tr>`;
  });
  tableHtml += `</tbody></table>`;
  document.getElementById('platform-table').innerHTML = tableHtml;
}

function renderFunnel(){
  const container = document.getElementById('content');
  if (!kpis.length) { msg('لا توجد بيانات لبناء القمع.'); return; }
  const latestDateStr = formatDate(kpis[kpis.length-1].date);
  // group by platform for that date
  const latest = kpis.filter(r=> formatDate(r.date) === latestDateStr);
  container.innerHTML = `<div class="card"><strong>Funnel — ${latestDateStr}</strong></div>`;
  latest.forEach(r=>{
    const html = `<div class="card">
      <h4>${r.platform}</h4>
      <div class="small-muted">Impressions → Clicks → LPV → ATC → BeginCheckout → Purchases</div>
      <ul>
        <li>Impressions: ${r.impressions}</li>
        <li>Clicks: ${r.clicks}</li>
        <li>LPV: ${r.landing_page_views}</li>
        <li>ATC: ${r.add_to_cart}</li>
        <li>Begin Checkout: ${r.begin_checkout}</li>
        <li>Purchases: ${r.purchases}</li>
        <li>Funnel conversion (purchases/clicks): ${r.funnel_conv!==null? r.funnel_conv.toFixed(4): '-'}</li>
        <li>ATC rate (ATC/LPV): ${r.atc_rate!==null? r.atc_rate.toFixed(4): '-'}</li>
        <li>Checkout rate (Begin/ATC): ${r.checkout_rate!==null? r.checkout_rate.toFixed(4): '-'}</li>
      </ul>
    </div>`;
    container.innerHTML += html;
  });
}

function renderTrends(){
  const container = document.getElementById('content');
  if (!kpis.length) { msg('لا توجد بيانات لعرض الاتجاهات.'); return; }
  const platforms = [...new Set(kpis.map(r=> r.platform))];
  const initial = platforms[0];
  container.innerHTML = `<div class="card"><label>اختر منصة:</label> <select id="trend-select">${platforms.map(p=> `<option value="${p}">${p}</option>`).join('')}</select></div>
  <div class="card" id="trend-charts"><div id="trend-plot" style="height:520px"></div></div>`;
  document.getElementById('trend-select').addEventListener('change', e=> drawTrend(e.target.value));
  drawTrend(initial);
}

function drawTrend(platform){
  const sub = kpis.filter(r=> r.platform === platform).sort((a,b)=> a.date - b.date);
  if (!sub.length) { msg('لا توجد بيانات لهذه المنصة.'); return; }
  const dates = sub.map(r=> formatDate(r.date));
  const spend = sub.map(r=> r.spend);
  const purchases = sub.map(r=> r.purchases);
  const roas = sub.map(r=> r.roas || 0);
  const ctr = sub.map(r=> r.ctr || 0);
  Plotly.newPlot('trend-plot', [
    {x:dates, y:spend, name:'Spend', yaxis:'y', type:'scatter', mode:'lines+markers'},
    {x:dates, y:purchases, name:'Purchases', yaxis:'y2', type:'scatter', mode:'lines+markers'},
    {x:dates, y:roas, name:'ROAS', yaxis:'y3', type:'scatter', mode:'lines+markers'},
    {x:dates, y:ctr, name:'CTR', yaxis:'y4', type:'scatter', mode:'lines+markers'}
  ], {
    title:`Trends — ${platform}`,
    margin:{t:40},
    yaxis:{title:'Spend'},
    yaxis2:{title:'Purchases', overlaying:'y', side:'left', position:0.02},
    yaxis3:{title:'ROAS', overlaying:'y', side:'right', position:0.92},
    yaxis4:{title:'CTR', overlaying:'y', side:'right', position:0.80}
  });
}

function renderHealth(){
  const container = document.getElementById('content');
  if (!signals.length) { msg('لا توجد إشارات.'); return; }
  const latestDate = signals[0].date;
  const latestStr = formatDate(latestDate);
  const latestSignals = signals.filter(s=> formatDate(s.date) === latestStr);
  const alerts = generateAlertsForDate(latestSignals);
  // Alerts panel
  let html = `<div class="card"><h4>تنبيهات — ${latestStr}</h4>`;
  if (!alerts.length) html += `<div class="alert ok">لا توجد تنبيهات نشطة</div>`; else {
    alerts.forEach(a=>{
      const cls = a.severity==='HIGH' ? 'high' : (a.severity==='MED' ? 'med' : 'ok');
      html += `<div class="alert ${cls}"><b>${a.severity}</b> — ${a.platform}: ${a.message}</div>`;
    });
  }
  html += `</div>`;
  // Signals scatter: opportunity vs fatigue
  html += `<div class="card"><div id="opp-fat" style="height:360px"></div></div>`;
  // Signals table
  html += `<div class="card"><h4>Signals Table</h4><table class="table"><thead><tr><th>Platform</th><th>Fatigue</th><th>Opportunity</th><th>CTR(7d)</th><th>CPM(7d)</th><th>Freq(7d)</th></tr></thead><tbody>`;
  latestSignals.forEach(r=>{
    html += `<tr><td>${r.platform}</td><td>${(r.fatigue_score||0).toFixed(3)}</td><td>${(r.opportunity_score||0).toFixed(3)}</td><td>${(r.ctr_7||0).toFixed(4)}</td><td>${(r.cpm_7||0).toFixed(2)}</td><td>${(r.freq_7||0).toFixed(2)}</td></tr>`;
  });
  html += `</tbody></table></div>`;
  container.innerHTML = html;
  // draw opp vs fatigue
  Plotly.newPlot('opp-fat', [
    {x: latestSignals.map(r=> r.platform), y: latestSignals.map(r=> r.opportunity_score), name:'Opportunity', type:'bar'},
    {x: latestSignals.map(r=> r.platform), y: latestSignals.map(r=> r.fatigue_score), name:'Fatigue', type:'bar'}
  ], {barmode:'group', title:'Opportunity vs Fatigue'});
}

function renderData(){
  const container = document.getElementById('content');
  if (!rawRows.length) { msg('لا توجد بيانات خام.'); return; }
  // show first 200 rows table to avoid heavy DOM
  const rows = rawRows.slice(0,200);
  let html = `<div class="card"><h4>البيانات الخام (أول 200 صف)</h4><table class="table"><thead><tr>`;
  const keys = Object.keys(rows[0]);
  keys.forEach(k=> html += `<th>${k}</th>`);
  html += `</tr></thead><tbody>`;
  rows.forEach(r=>{
    html += `<tr>`;
    keys.forEach(k=> html += `<td>${r[k]!==undefined ? r[k] : ''}</td>`);
    html += `</tr>`;
  });
  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

// ---------- Data Loaders: file input / URL / sample ----------
function handleFileUpload(file){
  const reader = new FileReader();
  reader.onload = function(e){
    try {
      const txt = e.target.result;
      const parsed = parseCSVText(txt);
      rawRows = normalizeRows(parsed);
      kpis = computeKPIs(rawRows);
      signals = computeSignals(kpis);
      // re-render active tab
      const active = document.querySelector('.tab.active').dataset.tab;
      routeTo(active);
    } catch(err){
      msg('خطأ في قراءة الملف: ' + err.message);
    }
  };
  reader.readAsText(file, 'utf-8');
}

// ----------------- Replace or add this function in app.js -----------------
async function handleUrlLoad(url) {
  // If user provided a URL use it (converted if Google Sheet),
  // otherwise try common relative paths inside the repo/site.
  const tryPaths = [];
  let finalUrl = (url || '').trim();

  if (finalUrl) {
    // Convert Google Sheets share link to CSV export if possible
    if (finalUrl.includes('docs.google.com/spreadsheets')) {
      // convert to export?format=csv
      if (finalUrl.includes('/edit')) finalUrl = finalUrl.replace('/edit', '/export');
      if (!finalUrl.includes('format=csv')) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'format=csv';
      }
    }
    tryPaths.push(finalUrl);
  } else {
    // No URL provided -> try relative paths (these files should be committed to the repo)
    tryPaths.push('./daily.csv');
    tryPaths.push('./data.csv');
    tryPaths.push('./platforms.csv');
    tryPaths.push('./data.csv');
    tryPaths.push('./daily.csv');
  }

  // Try fetching each candidate until one succeeds
  msg('جاري محاولة تحميل CSV... (محلي/نسبي أو عبر URL)');
  for (let p of tryPaths) {
    try {
      const res = await fetch(p, {cache: "no-store"});
      if (!res.ok) {
        // try next
        console.warn('fetch failed', p, res.status);
        continue;
      }
      const txt = await res.text();
      // parse and load
      const parsed = parseCSVText(txt);
      rawRows = normalizeRows(parsed);
      kpis = computeKPIs(rawRows);
      signals = computeSignals(kpis);
      const active = document.querySelector('.tab.active').dataset.tab;
      routeTo(active);
      console.log('Loaded CSV from', p);
      return; // success
    } catch (err) {
      console.warn('error fetching', p, err);
      continue; // try next
    }
  }

  // if we reach here no candidate succeeded
  msg('فشل تحميل CSV. تأكد من وضع الملف داخل الريبو (مثلاً: /data/daily.csv) أو ضع رابط مباشر إلى raw CSV ثم اضغط تحميل.');
}


function loadSampleData(){
  // generate synthetic realistic sample data (60 days)
  const platforms = ['Meta','Google','TikTok','Snapchat'];
  const rows = [];
  const today = new Date();
  for (let d=59; d>=0; d--){
    const date = new Date(today); date.setDate(today.getDate() - d);
    platforms.forEach(p=>{
      const impressions = Math.round(Math.max(1000, 100000 + (Math.random()-0.5)*30000));
      const ctr = 0.01 + Math.random()*0.02; // 1%-3%
      const clicks = Math.round(impressions * ctr);
      const spend = +(clicks * (0.4 + Math.random()*0.8)).toFixed(2);
      const reach = Math.round(impressions * (0.5 + Math.random()*0.4));
      const lpv = Math.round(clicks * (0.6 + Math.random()*0.35));
      const atc = Math.round(lpv * (0.06 + Math.random()*0.14));
      const begin = Math.round(atc * (0.4 + Math.random()*0.5));
      const purchases = Math.round(begin * (0.25 + Math.random()*0.5));
      const revenue = +(purchases * (25 + Math.random()*60)).toFixed(2);
      const frequency = +(1.2 + Math.random()*2.3).toFixed(2);
      rows.push({
        date: formatDate(date),
        platform: p,
        spend, impressions, reach, clicks,
        landing_page_views: lpv, add_to_cart: atc, begin_checkout: begin,
        purchases, revenue, frequency
      });
    });
  }
  rawRows = normalizeRows(rows);
  kpis = computeKPIs(rawRows);
  signals = computeSignals(kpis);
  const active = document.querySelector('.tab.active').dataset.tab;
  routeTo(active);
}

// ---------- Router for tabs ----------
function routeTo(tab){
  document.querySelectorAll('.tab').forEach(t=> t.classList.toggle('active', t.dataset.tab===tab));
  if (tab === 'overview') renderOverview();
  else if (tab === 'funnel') renderFunnel();
  else if (tab === 'trends') renderTrends();
  else if (tab === 'health') renderHealth();
  else if (tab === 'data') renderData();
}

// ---------- Wiring events ----------
document.addEventListener('DOMContentLoaded', ()=>{
  // tabs
  document.querySelectorAll('.tab').forEach(b=>{
    b.addEventListener('click', ()=> routeTo(b.dataset.tab));
  });
  // file input
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', e=>{
    const f = e.target.files[0];
    if (!f) return;
    handleFileUpload(f);
  });
  // load URL
  document.getElementById('load-url-btn').addEventListener('click', ()=>{
    const url = document.getElementById('csv-url').value.trim();
    if (!url) { alert('ضع رابط CSV'); return; }
    // If Google Sheets sharing link provided, try to convert to export?format=csv
    let finalUrl = url;
    // convert typical Google Sheets share URL to CSV export
    if (url.includes('docs.google.com/spreadsheets')) {
      // try to replace /edit#gid=... with /export?format=csv&gid=...
      if (url.includes('/edit')) finalUrl = url.replace('/edit', '/export') + (url.includes('export') ? '' : '?format=csv');
      if (url.includes('gid=')) {
        if (!finalUrl.includes('format=csv')) finalUrl += finalUrl.includes('?') ? '&format=csv' : '?format=csv';
      } else {
        if (!finalUrl.includes('format=csv')) finalUrl += finalUrl.includes('?') ? '&format=csv' : '?format=csv';
      }
    }
    handleUrlLoad(finalUrl);
  });
  // sample
  document.getElementById('load-sample-btn').addEventListener('click', ()=> loadSampleData());
  document.getElementById('clear-btn').addEventListener('click', ()=>{
    rawRows = []; kpis = []; signals = [];
    msg('تم مسح البيانات.');
  });

  // auto load sample on first open
  loadSampleData();
});

// ---------- Extra: expose download CSV of computed KPIs (optional) ----------
function downloadKPIs(){
  if (!kpis.length) { alert('لا توجد بيانات'); return; }
  const headers = Object.keys(kpis[0]);
  const csv = [headers.join(',')].concat(kpis.map(row => headers.map(h=>{
    const v = row[h];
    if (v === null || v === undefined) return '';
    if (v instanceof Date) return formatDate(v);
    return typeof v === 'number' ? v : `"${String(v).replace(/"/g,'""')}"`;
  }).join(',')));
  const blob = new Blob([csv.join('\\n')], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'kpis_platform_date.csv'; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 1500);
}

// expose download function on window for debugging
window.downloadKPIs = downloadKPIs;
