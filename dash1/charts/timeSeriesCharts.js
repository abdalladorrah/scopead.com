// charts/timeSeriesCharts.js
import { getChartInstance, destroyChart } from "./chartFactory.js";

let spendSalesChart = null;
let cpaChart = null;

export function renderSpendSalesChart(timeseries) {
  spendSalesChart = getChartInstance("spendSalesChart_echarts");
  if (!spendSalesChart) return;

  const dates = timeseries.map(t => t.Date);
  const spend = timeseries.map(t => t.AmountSpent);
  const purchases = timeseries.map(t => t.Purchases);

  const option = {
    title: { text: "Spend vs Purchases Over Time", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
    xAxis: { type: "category", data: dates },
    yAxis: [
      { type: "value", name: "Spend", position: "left" },
      { type: "value", name: "Purchases", position: "right" }
    ],
    series: [
      {
        name: "Spend",
        type: "bar",
        data: spend,
        yAxisIndex: 0,
        itemStyle: { color: "#5470C6" }
      },
      {
        name: "Purchases",
        type: "line",
        data: purchases,
        yAxisIndex: 1,
        smooth: true,
        itemStyle: { color: "#EE6666" }
      }
    ]
  };

  spendSalesChart.setOption(option);
}

export function renderCPAChart(timeseries) {
  // Use destroyChart if needed before getting new instance? 
  // Actually, getChartInstance returns existing or new. 
  // Logic in app.js calls destroyTimeSeriesCharts() before re-rendering.

  cpaChart = getChartInstance("cpaChart_echarts");
  if (!cpaChart) return;

  const dates = timeseries.map(t => t.Date);
  // Calculate Daily CPA
  const cpaData = timeseries.map(t => {
    return t.Purchases > 0 ? (t.AmountSpent / t.Purchases).toFixed(2) : 0;
  });

  const option = {
    title: { text: "CPA Over Time", left: "center" },
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value", name: "CPA" },
    series: [
      {
        name: "CPA",
        type: "line",
        smooth: true,
        data: cpaData,
        itemStyle: { color: "#91CC75" },
        areaStyle: { opacity: 0.1 }
      }
    ]
  };

  cpaChart.setOption(option);
}

export function destroyTimeSeriesCharts() {
  destroyChart("spendSalesChart_echarts");
  spendSalesChart = null;

  destroyChart("cpaChart_echarts");
  cpaChart = null;
}
