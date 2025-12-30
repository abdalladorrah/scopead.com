// charts/chartFactory.js
const registry = new Map();

export function getChartInstance(containerId) {
  if (registry.has(containerId)) {
    return registry.get(containerId);
  }
  const el = document.getElementById(containerId);
  if (!el) return null;
  const chart = echarts.init(el);
  registry.set(containerId, chart);
  return chart;
}

export function destroyChart(containerId) {
  const chart = registry.get(containerId);
  if (chart) {
    chart.dispose();
    registry.delete(containerId);
  }
}

export function renderChart(containerId, option) {
  const chart = getChartInstance(containerId);
  if (!chart) return;
  chart.setOption(option, true);
  setTimeout(() => chart.resize(), 0);
}

window.addEventListener("resize", () => {
  registry.forEach(chart => chart.resize());
});
