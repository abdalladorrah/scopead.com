// data/aggregator.js
import { toNumber } from "./dataNormalizer.js";

export function aggregate(rows, platform, from, to) {
  const fromDate = from || null; // YYYY-MM-DD
  const toDate = to || null;     // YYYY-MM-DD

  // ================= FILTER =================
  const filtered = rows.filter(r => {
    if (platform !== "All" && r.Platform !== platform) return false;

    // Use normalized ISO date for filtering logic
    const dateStr = r._date_iso || r.Date;
    if (!dateStr) return false;

    if (fromDate && dateStr < fromDate) return false;
    if (toDate && dateStr > toDate) return false;

    return true;
  });

  // ================= TOTALS =================
  const totals = {
    spend: 0,
    impr: 0,
    reach: 0,
    clicks: 0,
    landings: 0,
    atc: 0,
    ic: 0,
    purch: 0,
    value: 0
  };

  filtered.forEach(r => {
    totals.spend += toNumber(r["Amount Spent"]);
    totals.impr += toNumber(r["Impressions"]);
    totals.reach += toNumber(r["Reach"]);
    totals.clicks += toNumber(r["Link Clicks"]);
    totals.landings += toNumber(r["Landing View"]);
    totals.atc += toNumber(r["Add to Carts"]);
    totals.ic += toNumber(r["Initial Checkpoint"]);
    totals.purch += toNumber(r["Purchases"]);
    totals.value += toNumber(r["Purchase Value"]);
  });

  // ================= TIMESERIES =================
  const byDate = {};
  filtered.forEach(r => {
    // Group by ISO date to ensure correct sorting
    const date = r._date_iso || r.Date;

    if (!byDate[date]) {
      byDate[date] = {
        Date: date,
        AmountSpent: 0,
        Purchases: 0
      };
    }

    byDate[date].AmountSpent += toNumber(r["Amount Spent"]);
    byDate[date].Purchases += toNumber(r["Purchases"]);
  });

  const timeseries = Object.values(byDate).sort((a, b) =>
    a.Date.localeCompare(b.Date)
  );

  // ================= METRICS CALCULATION HELPER =================
  const safeDiv = (a, b) => (b ? a / b : 0);

  // Calculate day count for daily averages
  let daysCount = 1;
  if (filtered.length > 0) {
    // Sort dates to find min and max
    // Use ISO date for sorting
    const sortedDates = filtered.map(r => r._date_iso || r.Date).sort();
    const minDate = new Date(sortedDates[0]);
    const maxDate = new Date(sortedDates[sortedDates.length - 1]);
    const diffTime = Math.abs(maxDate - minDate);
    daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  // ================= PER PLATFORM =================
  const byPlatform = {};
  filtered.forEach(r => {
    const p = r.Platform;

    if (!byPlatform[p]) {
      byPlatform[p] = {
        Platform: p,
        AmountSpent: 0,
        Impressions: 0,
        Reach: 0,
        LinkClicks: 0,
        LandingView: 0,
        AddToCarts: 0,
        InitiateCheckout: 0,
        Purchases: 0,
        PurchaseValue: 0
      };
    }

    const o = byPlatform[p];
    o.AmountSpent += toNumber(r["Amount Spent"]);
    o.Impressions += toNumber(r["Impressions"]);
    o.Reach += toNumber(r["Reach"]);
    o.LinkClicks += toNumber(r["Link Clicks"]);
    o.LandingView += toNumber(r["Landing View"]);
    o.AddToCarts += toNumber(r["Add to Carts"]);
    o.InitiateCheckout += toNumber(r["Initial Checkpoint"]);
    o.Purchases += toNumber(r["Purchases"]);
    o.PurchaseValue += toNumber(r["Purchase Value"]);
  });

  const platformArr = Object.values(byPlatform).map(p => {
    return {
      ...p,
      ROAS: safeDiv(p.PurchaseValue, p.AmountSpent),
      CPA: safeDiv(p.AmountSpent, p.Purchases),
      CPM: safeDiv(p.AmountSpent, p.Impressions) * 1000,
      Frequency: safeDiv(p.Impressions, p.Reach),
      AOV: safeDiv(p.PurchaseValue, p.Purchases),
      DailyATC: safeDiv(p.AddToCarts, daysCount),
      DailyPurchases: safeDiv(p.Purchases, daysCount),
      DailySpend: safeDiv(p.AmountSpent, daysCount)
    };
  });

  const overallMetrics = {
    Platform: "All",
    AmountSpent: totals.spend,
    Impressions: totals.impr,
    Reach: totals.reach,
    LinkClicks: totals.clicks,
    LandingView: totals.landings,
    AddToCarts: totals.atc,
    InitiateCheckout: totals.ic,
    Purchases: totals.purch,
    PurchaseValue: totals.value,

    // Calculated
    ROAS: safeDiv(totals.value, totals.spend),
    CPA: safeDiv(totals.spend, totals.purch),
    CPM: safeDiv(totals.spend, totals.impr) * 1000,
    Frequency: safeDiv(totals.impr, totals.reach),
    AOV: safeDiv(totals.value, totals.purch),

    // Dailies
    DailyATC: safeDiv(totals.atc, daysCount),
    DailyPurchases: safeDiv(totals.purch, daysCount),
    DailySpend: safeDiv(totals.spend, daysCount),

    daysCount
  };

  return {
    totals,
    timeseries,
    platformArr,
    overallMetrics,
    filtered
  };
}
