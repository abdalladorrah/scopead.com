// charts/comparisonCharts.js
import { getChartInstance, destroyChart } from "./chartFactory.js";

let charts = {};

function buildBarOption(title, labels, data, name = "Value") {
  return {
    title: { text: title, left: "center" },
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
    xAxis: { type: "category", data: labels, axisLabel: { interval: 0, rotate: 30 } },
    yAxis: { type: "value" },
    series: [
      {
        name: name,
        type: "bar",
        data: data,
        itemStyle: { borderRadius: [5, 5, 0, 0] }
      }
    ]
  };
}

function buildDualBarOption(title, labels, data1, name1, data2, name2) {
  return {
    title: { text: title, left: "center" },
    tooltip: { trigger: "axis" },
    legend: { bottom: 0 },
    grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
    xAxis: { type: "category", data: labels, axisLabel: { interval: 0, rotate: 30 } },
    yAxis: [
      { type: "value", name: name1, position: "left" },
      { type: "value", name: name2, position: "right" }
    ],
    series: [
      {
        name: name1,
        type: "bar",
        data: data1
      },
      {
        name: name2,
        type: "bar",
        data: data2,
        yAxisIndex: 1
      }
    ]
  };
}

export function renderComparisonCharts(platformArr) {
  const labels = platformArr.map(p => p.Platform);

  // 1. Impressions & Spend
  charts.impSpend = getChartInstance("compImpSpendChart");
  if (charts.impSpend) {
    charts.impSpend.setOption(
      buildDualBarOption("Impressions & Spend", labels,
        platformArr.map(p => p.Impressions), "Impressions",
        platformArr.map(p => p.AmountSpent), "Spend"
      )
    );
  }

  // 2. Link Clicks
  charts.clicks = getChartInstance("compClicksChart");
  if (charts.clicks) {
    charts.clicks.setOption(buildBarOption("Link Clicks by Platform", labels, platformArr.map(p => p.LinkClicks), "Clicks"));
  }

  // 3. ATC
  charts.atc = getChartInstance("compATCChart");
  if (charts.atc) {
    charts.atc.setOption(buildBarOption("ATC by Platform", labels, platformArr.map(p => p.AddToCarts), "ATC"));
  }

  // 4. Purchase Value
  charts.val = getChartInstance("compValueChart");
  if (charts.val) {
    charts.val.setOption(buildBarOption("Purchase Value by Platform", labels, platformArr.map(p => p.PurchaseValue), "Value"));
  }

  // 5. Purchases
  charts.purch = getChartInstance("compPurchChart");
  if (charts.purch) {
    charts.purch.setOption(buildBarOption("Purchases by Platform", labels, platformArr.map(p => p.Purchases), "Purchases"));
  }
}

export function destroyComparisonCharts() {
  // We need to destroy by container ID, but we only have chart instances stored in `charts` object.
  // Actually, getChartInstance uses the container ID.
  // Let's look at how we called getChartInstance.
  // impSpend: "compImpSpendChart"
  // clicks: "compClicksChart"
  // atc: "compATCChart"
  // val: "compValueChart"
  // purch: "compPurchChart"

  const containers = [
    "compImpSpendChart",
    "compClicksChart",
    "compATCChart",
    "compValueChart",
    "compPurchChart"
  ];

  containers.forEach(id => destroyChart(id));
  charts = {};
}
