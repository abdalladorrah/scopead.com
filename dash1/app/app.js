// app/app.js
import { loadCsvFromUrl, loadCsvFromFile } from "../data/csvLoader.js";
import { normalizeRows } from "../data/dataNormalizer.js";

import {
  subscribe,
  setRows,
  setPlatform
} from "../state/store.js";

import { initFilters } from "../ui/filters.js";
import { renderPlatformTabs } from "../ui/tabs.js";
import { renderKPIs } from "../ui/kpis.js";
import { renderMetricsCards } from "../ui/metricsCards.js";
import { updateVisibility } from "../ui/visibility.js";

import {
  renderSpendSalesChart,
  renderCPAChart,
  destroyTimeSeriesCharts
} from "../charts/timeSeriesCharts.js";

import {
  renderComparisonCharts,
  destroyComparisonCharts
} from "../charts/comparisonCharts.js";

import {
  renderFunnel1,
  renderFunnel2,
  destroyFunnelCharts
} from "../charts/funnelCharts.js";

async function init() {
  initFilters();

  const rawRows = await loadCsvFromUrl("assets/marketing.csv");
  const { rows, isoToDisplayMap } = normalizeRows(rawRows);

  const platforms = [...new Set(rows.map(r => r.Platform))];
  renderPlatformTabs(platforms, "All");

  setRows(rows, isoToDisplayMap);
}

subscribe((aggregated, state) => {
  const platform = state.filters.platform;

  updateVisibility(platform);

  // 1. TOP KPIs
  // Based on platform? No, aggregated already filters by platform if single.
  // We need metrics for the current selection.
  let metricsForCards = aggregated.overallMetrics;
  // Note: aggregator returns 'overallMetrics' which represents TOTALS of the filtered rows.
  // If platform is selected, 'filtered' contains only that platform rows.
  // So 'overallMetrics' is correct for both cases.

  renderKPIs(aggregated); // Still using old KPIs logic? renderKPIs seems to populate the top 4 cards. We should check it.
  renderMetricsCards(aggregated, platform);

  // Clear charts before re-rendering
  destroyTimeSeriesCharts();
  destroyComparisonCharts();
  destroyFunnelCharts();

  // 2. Time Series (Always show for current selection)
  renderSpendSalesChart(aggregated.timeseries);
  renderCPAChart(aggregated.timeseries);

  // 3. Funnels (Always show for current selection)
  renderFunnel1(metricsForCards);
  renderFunnel2(metricsForCards);

  // 4. Comparisons (Only if All)
  if (platform === "All") {
    renderComparisonCharts(aggregated.platformArr);
  }
});

document.getElementById("fileInput").addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  const raw = await loadCsvFromFile(file);
  const { rows, isoToDisplayMap } = normalizeRows(raw);

  const platforms = [...new Set(rows.map(r => r.Platform))];
  renderPlatformTabs(platforms, "All");

  setPlatform("All");
  setRows(rows, isoToDisplayMap);
});

init();
