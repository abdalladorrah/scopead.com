/* ===== تفعيل الـ DataLabels على مستوى كل الشارتات ===== */
Chart.register(ChartDataLabels);

Chart.defaults.set('plugins.datalabels', {
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
      return value.toFixed(1);
    }
    return value;
  }
});

// ========== Global State ==========
let chartTS = null;
let chartBar = null;
let chartCmpImpr = null;
let chartCmpReach = null;
let chartCmpClicks = null;
let chartCmpATC = null;
let chartCmpPurchVal = null;
let chartCmpPurch = null;
let chartCmpLanding = null;

let isoToDisplay = {};
let currentPlatform = 'All';
window._rows = [];

// =============================
// render(overallResult, selectedResult)
// =============================
function render(overallResult, selectedResult) {
  // ===== KPIs (All) =====
  const kpiROAS =
    overallResult.overallMetrics &&
    typeof overallResult.overallMetrics.ROAS === 'number'
      ? overallResult.overallMetrics.ROAS
      : 0;

  // 1) Total Spend
  document.getElementById('kpiSpend').textContent =
    overallResult.totalSpend.toFixed(2);
  // 2) Total Revenue (Purchase Value)
  document.getElementById('kpiImpr').textContent =
    overallResult.totalValue.toFixed(2);
  // 3) Total Purchases
  document.getElementById('kpiPurch').textContent =
    overallResult.totalPurch;
  // 4) ROAS
  document.getElementById('kpiValue').textContent =
    kpiROAS.toFixed(2) + 'x';

  // ===== Time Series: حسب المنصة المختارة =====
  const ts = selectedResult;
  const tsLabels = ts.timeseries.map(
    (d) => isoToDisplay[d.Date] || d.Date || 'Unknown'
  );
  const spendData = ts.timeseries.map((d) => d.AmountSpent);

  const tsCanvas = document.getElementById('tsChart');
  if (tsCanvas) {
    if (chartTS) chartTS.destroy();
    const ctx = tsCanvas.getContext('2d');
    const datasets = [];

    if (spendData.length) {
      datasets.push({
        label: `Amount Spent (${currentPlatform === 'All' ? 'All' : currentPlatform})`,
        data: spendData,
        borderColor: 'rgba(56,189,248,1)',
        backgroundColor: 'rgba(56,189,248,0.18)',
        tension: 0.25,
        fill: true
      });
    }

    if (!datasets.length) {
      document.getElementById('tsMsg').textContent =
        'لا توجد بيانات زمنية لتعرض.';
      ctx.clearRect(0, 0, tsCanvas.width, tsCanvas.height);
    } else {
      document.getElementById('tsMsg').textContent = '';
      chartTS = new Chart(ctx, {
        type: 'line',
        data: { labels: tsLabels, datasets },
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
    }
  }

  // ===== Summary: Impressions + Spend by platform (الكارت اللي فوق على اليمين) =====
  const platLabels = overallResult.platformArr.map((p) => p.Platform);
  const imprs = overallResult.platformArr.map((p) => p.Impressions || 0);
  const spends = overallResult.platformArr.map((p) => p.AmountSpent || 0);

  const barCanvas = document.getElementById('barChart');
  if (barCanvas) {
    if (chartBar) chartBar.destroy();
    const ctx2 = barCanvas.getContext('2d');

    if (!platLabels.length) {
      document.getElementById('barMsg').textContent =
        'لا توجد بيانات للمنصات لعرضها.';
      ctx2.clearRect(0, 0, barCanvas.width, barCanvas.height);
    } else {
      document.getElementById('barMsg').textContent = '';
      chartBar = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: platLabels,
          datasets: [
            {
              label: 'Impressions',
              data: imprs,
              backgroundColor: 'rgba(96,165,250,0.95)'
            },
            {
              label: 'Amount Spent',
              data: spends,
              backgroundColor: 'rgba(45,212,191,0.9)'
            }
          ]
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
    }
  }

  // ===== Cross-platform Comparison (الـ 7 Charts) =====
  const reachArr    = overallResult.platformArr.map(p => p.Reach || 0);
  const clicksArr   = overallResult.platformArr.map(p => p.LinkClicks || 0);
  const atcArr      = overallResult.platformArr.map(p => p.AddToCarts || 0);
  const purchValArr = overallResult.platformArr.map(p => p.PurchaseValue || 0);
  const purchArr    = overallResult.platformArr.map(p => p.Purchases || 0);
  const landingArr  = overallResult.platformArr.map(p => p.LandingView || 0);

  // 1) Impressions by Platform
  const cmpImprCanvas = document.getElementById('cmpImprChart');
  if (cmpImprCanvas) {
    if (chartCmpImpr) chartCmpImpr.destroy();
    const ctxImpr = cmpImprCanvas.getContext('2d');
    chartCmpImpr = new Chart(ctxImpr, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Impressions',
          data: imprs,
          backgroundColor: 'rgba(96,165,250,0.95)'
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
  }

  // 2) Reach by Platform
  const cmpReachCanvas = document.getElementById('cmpReachChart');
  if (cmpReachCanvas) {
    if (chartCmpReach) chartCmpReach.destroy();
    const ctxReach = cmpReachCanvas.getContext('2d');
    chartCmpReach = new Chart(ctxReach, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Reach',
          data: reachArr,
          backgroundColor: 'rgba(52,211,153,0.9)'
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
  }

  // 3) Link Clicks by Platform
  const cmpClicksCanvas = document.getElementById('cmpClicksChart');
  if (cmpClicksCanvas) {
    if (chartCmpClicks) chartCmpClicks.destroy();
    const ctxClicks = cmpClicksCanvas.getContext('2d');
    chartCmpClicks = new Chart(ctxClicks, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Link Clicks',
          data: clicksArr,
          backgroundColor: 'rgba(129,140,248,0.9)'
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
  }

  // 4) Add To Carts by Platform
  const cmpATCCanvas = document.getElementById('cmpATCChart');
  if (cmpATCCanvas) {
    if (chartCmpATC) chartCmpATC.destroy();
    const ctxATC = cmpATCCanvas.getContext('2d');
    chartCmpATC = new Chart(ctxATC, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Add To Carts',
          data: atcArr,
          backgroundColor: 'rgba(248,113,113,0.9)'
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
  }

  // 5) Purchase Value by Platform
  const cmpPurchValCanvas = document.getElementById('cmpPurchValChart');
  if (cmpPurchValCanvas) {
    if (chartCmpPurchVal) chartCmpPurchVal.destroy();
    const ctxPurchVal = cmpPurchValCanvas.getContext('2d');
    chartCmpPurchVal = new Chart(ctxPurchVal, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Purchase Value',
          data: purchValArr,
          backgroundColor: 'rgba(56,189,248,0.9)'
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
  }

  // 6) Purchases by Platform
  const cmpPurchCanvas = document.getElementById('cmpPurchChart');
  if (cmpPurchCanvas) {
    if (chartCmpPurch) chartCmpPurch.destroy();
    const ctxPurch = cmpPurchCanvas.getContext('2d');
    chartCmpPurch = new Chart(ctxPurch, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Purchases',
          data: purchArr,
          backgroundColor: 'rgba(251,191,36,0.9)'
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
  }

  // 7) Landing Views by Platform (Initial Checkpoints)
  const cmpLandingCanvas = document.getElementById('cmpLandingChart');
  if (cmpLandingCanvas) {
    if (chartCmpLanding) chartCmpLanding.destroy();
    const ctxLanding = cmpLandingCanvas.getContext('2d');
    chartCmpLanding = new Chart(ctxLanding, {
      type: 'bar',
      data: {
        labels: platLabels,
        datasets: [{
          label: 'Landing Views',
          data: landingArr,
          backgroundColor: 'rgba(96,165,250,0.9)'
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
  }

  // ===== Platform Metric Cards =====
  const metricsContainer = document.getElementById('platformMetrics');
  if (metricsContainer) {
    metricsContainer.innerHTML = '';

    const metricDefs = [
      {
        key: 'AvgOrdersPerDay',
        label: 'Avg Orders/Day',
        fmt: (v) => v.toFixed(2),
        sub: 'متوسط عدد الطلبات في اليوم'
      },
      {
        key: 'AvgATCPerDay',
        label: 'Avg ATC/Day',
        fmt: (v) => v.toFixed(2),
        sub: 'متوسط الإضافات للسلة في اليوم'
      },
      {
        key: 'AvgSalesPerDay',
        label: 'Avg Sales/Day',
        fmt: (v) => v.toFixed(2),
        sub: 'متوسط قيمة المبيعات في اليوم'
      },
      {
        key: 'AOV',
        label: 'AOV',
        fmt: (v) => v.toFixed(2),
        sub: 'متوسط قيمة الطلب الواحد'
      },
      {
        key: 'CPA',
        label: 'CPA',
        fmt: (v) => v.toFixed(2),
        sub: 'Cost Per Acquisition'
      },
      {
        key: 'AddToCarts',
        label: 'ATC',
        fmt: (v) => v.toLocaleString(),
        sub: 'إجمالي الإضافات للسلة'
      },
      {
        key: 'Impressions',
        label: 'Impressions',
        fmt: (v) => v.toLocaleString(),
        sub: 'عدد مرات الظهور'
      },
      {
        key: 'Reach',
        label: 'Reach',
        fmt: (v) => v.toLocaleString(),
        sub: 'عدد المستخدمين (Reach)'
      },
      {
        key: 'AvgFrequency',
        label: 'Avg Freq.',
        fmt: (v) => v.toFixed(2),
        sub: 'متوسط مرات الظهور للفرد'
      },
      {
        key: 'CTR',
        label: 'Avg CTR',
        fmt: (v) => (v * 100).toFixed(2) + '%',
        sub: 'متوسط Click Through Rate'
      },
      {
        key: 'CPM',
        label: 'CPM',
        fmt: (v) => v.toFixed(2),
        sub: 'Cost per 1000 Impr.'
      },
      {
        key: 'CPC',
        label: 'CPC',
        fmt: (v) => v.toFixed(2),
        sub: 'Cost per Click'
      }
    ];

    let platformsMetrics;
    if (currentPlatform === 'All') {
      platformsMetrics = overallResult.overallMetrics
        ? [overallResult.overallMetrics]
        : [];
    } else {
      const one = selectedResult.platformArr.find(
        (p) => p.Platform === currentPlatform
      );
      platformsMetrics = one ? [one] : [];
    }

    platformsMetrics.forEach((p) => {
      metricDefs.forEach((m) => {
        const raw = p[m.key];
        if (
          raw === undefined ||
          raw === null ||
          (typeof raw === 'number' && isNaN(raw))
        )
          return;

        const val =
          typeof raw === 'number' ? raw : Number(raw) || 0;
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
  const resp = await fetch('marketing.csv'); // عدّل المسار لو الملف في مكان تاني
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
