// ui/kpis.js
export function renderKPIs(aggregated) {
  const { totals } = aggregated;

  // Helper for currency
  const fmtSame = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "SAR" }).format(n);

  document.getElementById("kpiSpend").textContent = fmtSame(totals.spend);

  document.getElementById("kpiPurchases").textContent =
    totals.purch.toLocaleString();

  document.getElementById("kpiPurchaseValue").textContent = fmtSame(totals.value);

  const roas = totals.spend ? (totals.value / totals.spend) : 0;
  document.getElementById("kpiROAS").textContent = roas.toFixed(2) + "x";
}
