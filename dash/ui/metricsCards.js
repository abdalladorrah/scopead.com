// ui/metricsCards.js

export function renderMetricsCards(aggregated, platformName) {
  const container = document.getElementById("metricsGrid");
  if (!container) return;
  container.innerHTML = "";

  const m = aggregated.overallMetrics;

  // Helper for currency
  const fmtCurr = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "SAR" }).format(n);
  // Helper for numbers
  const fmtNum = (n) => new Intl.NumberFormat("en-US").format(Math.round(n));
  // Helper for fixed decimals
  const fmtFix = (n) => n ? n.toFixed(2) : "0.00";

  const cardsData = [
    { label: "Impressions", value: fmtNum(m.Impressions), sub: "IMP" },
    { label: "Reach", value: fmtNum(m.Reach), sub: "REACH" },
    { label: "Link Clicks", value: fmtNum(m.LinkClicks), sub: "CLICKS" },
    { label: "Landing Views", value: fmtNum(m.LandingView), sub: "VIEWS" },
    { label: "Add To Cart", value: fmtNum(m.AddToCarts), sub: "ATC" },
    { label: "Initiate Checkout", value: fmtNum(m.InitiateCheckout), sub: "IC" },
    { label: "Total Purchases", value: fmtNum(m.Purchases), sub: "PURCH" },
    { label: "Cost Per Acquisition", value: fmtCurr(m.CPA), sub: "CPA" },
    { label: "Cost Per 1000 Imp", value: fmtCurr(m.CPM), sub: "CPM" },
    { label: "Frequency", value: fmtFix(m.Frequency), sub: "FREQ" },
    { label: "Avg Orders/Day", value: fmtFix(m.DailyPurchases), sub: "AVG" },
    { label: "Avg ATC/Day", value: fmtFix(m.DailyATC), sub: "DAILY ATC" },
    { label: "Avg Sales/Day", value: fmtCurr(m.DailySpend), sub: "DAILY SPEND" },
    { label: "Avg Revenue/Day", value: fmtCurr(m.PurchaseValue / (m.daysCount || 1)), sub: "REV/DAY" },
    { label: "Avg Order Value", value: fmtCurr(m.AOV), sub: "AOV" }
  ];

  cardsData.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    // Reuse existing styles but simpler
    card.innerHTML = `
      <div class="sub-text" style="text-transform:uppercase; font-size: 0.75rem; opacity:0.7; margin-bottom: 4px;">${platformName} ${item.sub}</div>
      <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 4px;">${item.value}</div>
      <div style="font-size: 0.85rem; opacity: 0.8;">${item.label}</div>
    `;
    container.appendChild(card);
  });
}
