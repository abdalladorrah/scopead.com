/* ===== تفعيل الـ DataLabels على مستوى كل الشارتات ===== */
Chart.register(ChartDataLabels);

// إعدادات عامة للـ DataLabels
const commonDataLabelsConfig = {
  color: '#111827',
  anchor: 'end',
  align: 'end',
  offset: 4,
  font: {
    size: 10,
    weight: '500'
  },
  formatter: (value) => {
    if (typeof value === 'number') {
      if (Math.abs(value) >= 1000) {
        return Math.round(value).toLocaleString();
      }
      return (value !== null && value !== undefined) ? value.toFixed(1) : value;
    }
    return value;
  }
};

Chart.defaults.set('plugins.datalabels', commonDataLabelsConfig);

// ========== Global State (للشارتات عشان نعملها destroy قبل إعادة الرسم) ==========
// شارتات صفحة All
let chartTSAll = null;
let chartBarAll = null;
let chartCmpImpr = null;
let chartCmpReach = null;
let chartCmpClicks = null;
let chartCmpATC = null;
let chartCmpPurchVal = null;
let chartCmpPurch = null;
let chartCmpLanding = null;

// شارتات صفحة المنصة الواحدة
let chartSpSpend = null;
let chartSpPurch = null;
let chartSpCPA = null;
let chartSpFunnel = null;

let isoToDisplay = {};
let currentPlatform = 'All';
window._rows = [];

// =============================
// render(overallResult, selectedResult)
// =============================
function render(overallResult, selectedResult) {
  // 1. تحديث الكروت العلوية (KPIs) - تعتمد دائماً على selectedResult
  renderTopKPIs(selectedResult);

  // 2. تحديث كروت المقاييس السفلية (Platform Metrics) - تعتمد دائماً على selectedResult
  renderBottomMetrics(selectedResult);

  // 3. التحكم في ظهور الحاويات ورسم الشارتات المناسبة
  const crossPlatformContainer = document.getElementById('crossPlatformContainer');
  const singlePlatformContainer = document.getElementById('singlePlatformContainer');

  if (currentPlatform === 'All') {
    // إظهار حاوية الكل وإخفاء حاوية المنصة
    crossPlatformContainer.style.display = 'block';
    singlePlatformContainer.style.display = 'none';
    document.getElementById('metricsTitle').textContent = 'Platform Metrics (All Platforms)';

    // رسم شارتات المقارنة (تعتمد على overallResult)
    renderCrossPlatformCharts(overallResult, selectedResult);

  } else {
    // إظهار حاوية المنصة وإخفاء حاوية الكل
    crossPlatformContainer.style.display = 'none';
    singlePlatformContainer.style.display = 'block';
    document.getElementById('metricsTitle').textContent = `Platform Metrics (${currentPlatform})`;
    document.getElementById('singlePlatformTitle').textContent = `تحليلات مفصلة لـ ${currentPlatform}`;

    // رسم شارتات المنصة الواحدة (تعتمد على selectedResult)
    renderSinglePlatformCharts(selectedResult);
  }
}

// ==================================================================
// دوال مساعدة للرسم (Helper Functions for Rendering)
// ==================================================================

// دالة لرسم الكروت العلوية
function renderTopKPIs(selectedResult) {
  document.getElementById('kpiSpend').textContent =
    selectedResult.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('kpiPurchases').textContent =
    selectedResult.totalPurch.toLocaleString();

  document.getElementById('kpiPurchaseValue').textContent =
    selectedResult.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const kpiROAS = selectedResult.totalSpend ? (selectedResult.totalValue / selectedResult.totalSpend) : 0;
  document.getElementById('kpiROAS').textContent = kpiROAS.toFixed(2) + 'x';
}

// دالة لرسم شارتات صفحة "All"
function renderCrossPlatformCharts(overallResult, selectedResult) {
  // أ) رسم الشارت الزمني العام (Spend Over Time - All)
  // نستخدم selectedResult هنا لأنه حتى في صفحة All، قد يكون هناك فلتر زمني مطبق
  drawTimeLineChart(
    'tsChartAll',
    'tsMsgAll',
    chartTSAll,
    selectedResult.timeseries,
    'AmountSpent',
    'Amount Spent (All)',
    'rgba(56,189,248,1)',
    (newChart) => { chartTSAll = newChart; }
  );

  // ب) رسم شارت المقارنة الرئيسي (Impressions & Spend)
  const platLabels = overallResult.platformArr.map((p) => p.Platform);
  const imprs = overallResult.platformArr.map((p) => p.Impressions || 0);
  const spends = overallResult.platformArr.map((p) => p.AmountSpent || 0);

  const barCanvas = document.getElementById('barChartAll');
  if (barCanvas) {
    if (chartBarAll) chartBarAll.destroy();
    const ctx = barCanvas.getContext('2d');
    if (!platLabels.length) {
      document.getElementById('barMsgAll').textContent = 'لا توجد بيانات للمنصات.';
      ctx.clearRect(0, 0, barCanvas.width, barCanvas.height);
    } else {
      document.getElementById('barMsgAll').textContent = '';
      chartBarAll = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: platLabels,
          datasets: [
            { label: 'Impressions', data: imprs, backgroundColor: 'rgba(96,165,250,0.95)' },
            { label: 'Amount Spent', data: spends, backgroundColor: 'rgba(45,212,191,0.9)' }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: '#ffffff' } }, x: { ticks: { color: '#ffffff' } } }, plugins: { legend: { labels: { color: '#ffffff' } } } }
      });
    }
  }

  // ج) رسم باقي شارتات المقارنة الـ 7 (باستخدام دالة مساعدة لتقليل التكرار)
  const drawCmpChart = (canvasId, chartInstance, dataKey, label, color, setChartInstance) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    if (chartInstance) chartInstance.destroy();
    const ctx = canvas.getContext('2d');
    const dataArr = overallResult.platformArr.map(p => p[dataKey] || 0);
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{ label: label, data: dataArr, backgroundColor: color }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: '#ffffff' } }, x: { ticks: { color: '#ffffff' } } }, plugins: { legend: { labels: { color: '#ffffff' } } } }
    });
    setChartInstance(newChart);
  };

  drawCmpChart('cmpImprChart', chartCmpImpr, 'Impressions', 'Impressions', 'rgba(96,165,250,0.95)', (c) => chartCmpImpr = c);
  drawCmpChart('cmpReachChart', chartCmpReach, 'Reach', 'Reach', 'rgba(52,211,153,0.9)', (c) => chartCmpReach = c);
  drawCmpChart('cmpClicksChart', chartCmpClicks, 'LinkClicks', 'Link Clicks', 'rgba(129,140,248,0.9)', (c) => chartCmpClicks = c);
  drawCmpChart('cmpATCChart', chartCmpATC, 'AddToCarts', 'Add To Carts', 'rgba(248,113,113,0.9)', (c) => chartCmpATC = c);
  drawCmpChart('cmpPurchValChart', chartCmpPurchVal, 'PurchaseValue', 'Purchase Value', 'rgba(56,189,248,0.9)', (c) => chartCmpPurchVal = c);
  drawCmpChart('cmpPurchChart', chartCmpPurch, 'Purchases', 'Purchases', 'rgba(251,191,36,0.9)', (c) => chartCmpPurch = c);
  drawCmpChart('cmpLandingChart', chartCmpLanding, 'LandingView', 'Landing Views', 'rgba(96,165,250,0.9)', (c) => chartCmpLanding = c);
}

// دالة لرسم شارتات صفحة المنصة الواحدة (الجديدة)
function renderSinglePlatformCharts(selectedResult) {
  const tsData = selectedResult.timeseries;
  const metrics = selectedResult.overallMetrics;

  // 1. رسم شارت الصرف خلال الوقت للمنصة
  drawTimeLineChart(
    'spSpendChart', 'spSpendMsg', chartSpSpend, tsData, 'AmountSpent', `Amount Spent (${currentPlatform})`, 'rgba(56,189,248,1)', (c) => chartSpSpend = c
  );

  // 2. رسم شارت المبيعات (Purchases) خلال الوقت للمنصة
  drawTimeLineChart(
    'spPurchChart', 'spPurchMsg', chartSpPurch, tsData, 'Purchases', `Purchases (${currentPlatform})`, 'rgba(251,191,36,1)', (c) => chartSpPurch = c
  );

  // 3. رسم شارت CPA خلال الوقت (يحتاج حساب يومي)
  // نقوم بتجهيز البيانات اليومية للـ CPA
  const cpaTimeSeries = tsData.map(d => ({
    Date: d.Date,
    CPA: d.Purchases > 0 ? (d.AmountSpent / d.Purchases) : 0
  }));

  drawTimeLineChart(
    'spCPAChart', 'spCPAMsg', chartSpCPA, cpaTimeSeries, 'CPA', `CPA (${currentPlatform})`, 'rgba(248, 113, 113, 1)', (c) => chartSpCPA = c
  );


  // 4. رسم قمع التحويل (Conversion Funnel)
  drawFunnelChart('spFunnelChart', chartSpFunnel, metrics, (c) => chartSpFunnel = c);
}


// دالة مساعدة عامة لرسم أي Line Chart زمني
function drawTimeLineChart(canvasId, msgId, chartInstance, timeseriesData, dataKey, label, color, setChartInstance) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (chartInstance) chartInstance.destroy();
  const ctx = canvas.getContext('2d');

  const labels = timeseriesData.map((d) => isoToDisplay[d.Date] || d.Date || 'Unknown');
  const data = timeseriesData.map((d) => d[dataKey]);

  if (!data.length || data.every(v => v === 0)) {
    document.getElementById(msgId).textContent = 'لا توجد بيانات للعرض.';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    document.getElementById(msgId).textContent = '';
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          borderColor: color,
          backgroundColor: color.replace('1)', '0.18)'),
          tension: 0.25,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, ticks: { color: '#ffffff' } },
          x: { ticks: { color: '#ffffff' } }
        },
        plugins: { legend: { labels: { color: '#ffffff' } } }
      }
    });
    setChartInstance(newChart);
  }
}

// دالة خاصة لرسم قمع التحويل (Funnel Chart)
function drawFunnelChart(canvasId, chartInstance, metrics, setChartInstance) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (chartInstance) chartInstance.destroy();

  // ترتيب مراحل القمع
  const funnelStages = [
    { key: 'Impressions', label: '1. Impressions' },
    { key: 'LinkClicks', label: '2. Link Clicks' },
    { key: 'LandingView', label: '3. Landing Views' },
    { key: 'AddToCarts', label: '4. Add To Carts' },
    { key: 'InitiateCheckout', label: '5. Initiate Checkout' },
    { key: 'Purchases', label: '6. Purchases' }
  ];

  const labels = funnelStages.map(s => s.label);
  // استخراج البيانات مع التأكد من أنها أرقام
  const data = funnelStages.map(s => Number(metrics[s.key]) || 0);

  // حساب نسب الفقد (Drop-off Rate) للمرحلة التالية
  const dropOffRates = data.map((val, index) => {
    if (index === data.length - 1) return null; // آخر مرحلة ليس لها فقد
    const nextVal = data[index + 1];
    if (val === 0) return 'N/A';
    const dropOff = ((val - nextVal) / val) * 100;
    return dropOff.toFixed(1) + '% Drop';
  });


  const ctx = canvas.getContext('2d');
  const newChart = new Chart(ctx, {
    type: 'bar', // نستخدم Bar chart لتمثيل القمع (يمكن تغييره لـ horizontalBar لو الشاشة عريضة)
    data: {
      labels: labels,
      datasets: [{
        label: 'Conversion Volume',
        data: data,
        // تدرج لوني بسيط للقمع
        backgroundColor: [
            'rgba(96, 165, 250, 0.9)',  // Blue (Impr)
            'rgba(129, 140, 248, 0.9)', // Indigo (Clicks)
            'rgba(52, 211, 153, 0.9)',  // Green (Landing)
            'rgba(251, 191, 36, 0.9)',  // Yellow (ATC)
            'rgba(248, 113, 113, 0.9)', // Red (IC)
            'rgba(236, 72, 153, 0.9)'   // Pink (Purchases)
        ],
        barPercentage: 0.8, // جعل الأعمدة أعرض قليلاً
      }]
    },
    options: {
      indexAxis: 'y', // جعل الشارت أفقي (Horizontal Bar) لتمثيل أفضل للقمع
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { // المحور الأفقي (القيم)
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#ffffff' }
        },
        y: { // المحور الرأسي (المراحل)
            grid: { display: false },
            ticks: { color: '#ffffff', font: { size: 12, weight: 'bold' } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                // إضافة نسبة الفقد في الـ Tooltip
                afterLabel: function(context) {
                    const dropOff = dropOffRates[context.dataIndex];
                    if (dropOff) {
                        return `\n▼ Next Step Drop-off: ${dropOff}`;
                    }
                    return '';
                }
            }
        },
        // تخصيص الـ DataLabels للقمع لعرض القيم ونسب الفقد
        datalabels: {
            ...commonDataLabelsConfig, // استخدام الإعدادات العامة كأساس
            anchor: 'end',
            align: 'right', // وضع النص على يمين العمود
            color: '#ffffff', // لون النص أبيض ليظهر على الخلفية الداكنة
            formatter: (value, context) => {
                 let label = value.toLocaleString();
                 // إضافة نسبة التحويل من المرحلة السابقة (اختياري - يجعل الشكل مزدحم قليلاً)
                 /*
                 if (context.dataIndex > 0) {
                    const prevVal = context.dataset.data[context.dataIndex - 1];
                    if (prevVal > 0) {
                        const convRate = ((value / prevVal) * 100).toFixed(1) + '%';
                        label += ` (Conv: ${convRate})`;
                    }
                 }
                 */
                 return label;
            }
        }
      }
    }
  });
  setChartInstance(newChart);
}

// دالة لرسم الكروت السفلية (Platform Metrics)
function renderBottomMetrics(selectedResult) {
  const metricsContainer = document.getElementById('platformMetrics');
  if (!metricsContainer) return;
  metricsContainer.innerHTML = '';

  // تعريف الميتريكس
  const metricDefs = [
      { key: 'Impressions', label: 'الظهور (Impressions)', fmt: (v) => v.toLocaleString(), sub: 'عدد مرات الظهور' },
      { key: 'Reach', label: 'الوصول (Reach)', fmt: (v) => v.toLocaleString(), sub: 'عدد المستخدمين الفريدين' },
      { key: 'LinkClicks', label: 'النقرات (Link Clicks)', fmt: (v) => v.toLocaleString(), sub: 'عدد النقرات على الرابط' },
      { key: 'LandingView', label: 'مشاهدة صفحة الهبوط (Landing Views)', fmt: (v) => v.toLocaleString(), sub: 'عدد مرات مشاهدة الصفحة المقصودة' },
      { key: 'AddToCarts', label: 'إجمالي الإضافات للسلة (ATC)', fmt: (v) => v.toLocaleString(), sub: 'إجمالي عدد مرات الإضافة للسلة' },
      { key: 'InitiateCheckout', label: 'بدء الدفع (Initiate Checkout)', fmt: (v) => v.toLocaleString(), sub: 'عدد مرات بدء عملية الدفع' },
      { key: 'Purchases', label: 'عدد الطلبات (Purchases)', fmt: (v) => v.toLocaleString(), sub: 'إجمالي عدد الطلبات المكتملة' },
      { key: 'CPA', label: 'تكلفة الاستحواذ (CPA)', fmt: (v) => v.toFixed(2), sub: 'Cost Per Acquisition' },
      { key: 'CPM', label: 'التكلفة لكل ألف ظهور (CPM)', fmt: (v) => v.toFixed(2), sub: 'Cost per 1000 Impressions' },
      { key: 'AvgFrequency', label: 'معدل التكرار (Frequency)', fmt: (v) => v.toFixed(2), sub: 'متوسط مرات الظهور للفرد' },
      { key: 'AvgOrdersPerDay', label: 'متوسط الطلبات/يوم', fmt: (v) => v.toFixed(2), sub: 'Avg Orders Per Day' },
      { key: 'AvgATCPerDay', label: 'متوسط الإضافة للسلة/يوم', fmt: (v) => v.toFixed(2), sub: 'Avg ATC Per Day' },
      { key: 'AvgSalesPerDay', label: 'متوسط المبيعات/يوم', fmt: (v) => v.toFixed(2), sub: 'Avg Sales Per Day' },
      { key: 'AOV', label: 'متوسط قيمة الطلب (AOV)', fmt: (v) => v.toFixed(2), sub: 'Average Order Value' }
  ];

  // تحديد البيانات التي ستعرض (إما للمنصة المختارة أو إجمالي الكل إذا كانت All)
  let platformsMetricsData;
  if (currentPlatform === 'All') {
      // في حالة All، نستخدم الإجماليات المحسوبة في overallMetrics الخاصة بـ selectedResult
      // التي تمثل مجموع البيانات المفلترة زمنياً لكل المنصات
      platformsMetricsData = selectedResult.overallMetrics ? [selectedResult.overallMetrics] : [];
      // ملاحظة: لو أردت عرض كارت لكل منصة في صفحة All (كما كان سابقاً)، استخدم الكود القديم هنا.
      // الكود الحالي يعرض كروت إجمالية فقط في صفحة All بناء على طلبك في المرات السابقة.
  } else {
      // في حالة منصة محددة، نستخدم بيانات المنصة من platformArr
      const one = selectedResult.platformArr.find((p) => p.Platform === currentPlatform);
      platformsMetricsData = one ? [one] : [];
  }

  platformsMetricsData.forEach((p) => {
    metricDefs.forEach((m) => {
      const raw = p[m.key];
      const val = (raw !== undefined && raw !== null && !isNaN(raw)) ? Number(raw) : 0;
      const platformKey = (p.Platform || 'unknown').toLowerCase();
      const div = document.createElement('div');
      div.className = `platform-metric-card platform-card--${platformKey}`;
      div.innerHTML = `
        <div class="platform-metric-header">
          <span class="platform-badge platform-badge--${platformKey}">${p.Platform}</span>
          <span class="metric-label">${m.label}</span>
        </div>
        <div class="metric-value">${m.fmt(val)}</div>
        <div class="metric-sub">${m.sub}</div>
      `;
      metricsContainer.appendChild(div);
    });
  });
}


// ===== Helper لريندر حسب الفلاتر الحالية =====
function renderWithCurrentFilters() {
  const df = document.getElementById('dateFrom').value;
  const dt = document.getElementById('dateTo').value;
  const overall = aggregate(window._rows, 'All', df, dt);
  const selected =
    currentPlatform === 'All'
      ? overall
      : aggregate(window._rows, currentPlatform, df, dt);
  render(overall, selected);
}

// ===== Tabs =====
function buildTabsFromPlatforms(platformSet) {
  const tabsContainer = document.getElementById('platformTabs');
  tabsContainer.innerHTML = '';
  const platforms = ['All', ...Array.from(platformSet).filter(Boolean)];

  platforms.forEach((p) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.platform = p === 'All' ? 'All' : String(p).toLowerCase();
    btn.textContent = p;
    if (p === currentPlatform) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPlatform = btn.dataset.platform;
      tabsContainer
        .querySelectorAll('.tab-btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderWithCurrentFilters();
    });
    tabsContainer.appendChild(btn);
  });
}

// ===== INIT =====
async function init() {
  // عدّل المسار لو الملف في مكان تاني
  const resp = await fetch('marketing.csv');
  const text = await resp.text();

  const rows = await parseCsv(text);
  isoToDisplay = normalizeRowDates(rows);
  rows.forEach((r) => {
    if (r.Platform) r.Platform = String(r.Platform).toLowerCase();
  });
  window._rows = rows;

  const pset = new Set(rows.map((r) => r.Platform || 'unknown'));
  currentPlatform = 'All';
  buildTabsFromPlatforms(pset);

  const presetSelect = document.getElementById('presetSelect');
  presetSelect.value = 'all';
  const range = computeDateRangeFromPreset('all');
  document.getElementById('dateFrom').value = range.from;
  document.getElementById('dateTo').value = range.to;

  const overall = aggregate(rows, 'All', range.from, range.to);
  const selected = overall;

  render(overall, selected);

  presetSelect.addEventListener('change', () => {
    const val = presetSelect.value;
    if (val === 'custom') return;
    const r2 = computeDateRangeFromPreset(val);
    document.getElementById('dateFrom').value = r2.from;
    document.getElementById('dateTo').value = r2.to;
    renderWithCurrentFilters();
  });

  document
    .getElementById('applyRange')
    .addEventListener('click', () => {
      presetSelect.value = 'custom';
      renderWithCurrentFilters();
    });

  document.getElementById('resetBtn').addEventListener('click', () => {
    currentPlatform = 'All';
    presetSelect.value = 'all';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    const tabsContainer = document.getElementById('platformTabs');
    tabsContainer
      .querySelectorAll('.tab-btn')
      .forEach((b) => {
        b.classList.toggle('active', b.dataset.platform === 'All');
      });
    renderWithCurrentFilters();
  });

  document
    .getElementById('fileInput')
    .addEventListener('change', async (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const text = await f.text();
      const newRows = await parseCsv(text);
      const newMap = normalizeRowDates(newRows);
      newRows.forEach((r) => {
        if (r.Platform) r.Platform = String(r.Platform).toLowerCase();
      });
      window._rows = newRows;
      isoToDisplay = newMap;
      const pset2 = new Set(
        newRows.map((r) => r.Platform || 'unknown')
      );
      currentPlatform = 'All';
      buildTabsFromPlatforms(pset2);
      const range4 = computeDateRangeFromPreset('all');
      document.getElementById('dateFrom').value = range4.from;
      document.getElementById('dateTo').value = range4.to;
      presetSelect.value = 'all';
      const overall2 = aggregate(
        newRows,
        'All',
        range4.from,
        range4.to
      );
      render(overall2, overall2);
    });

  setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
}

init();