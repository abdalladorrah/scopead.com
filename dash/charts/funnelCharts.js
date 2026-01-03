// charts/funnelCharts.js
import { getChartInstance, destroyChart } from "./chartFactory.js";

let funnel1Chart = null;
let funnel2Chart = null;

function buildFunnelOption(title, stages, colors) {
  return {
    title: { text: title, left: "center" },
    tooltip: { trigger: "item" },
    series: [
      {
        type: "funnel",
        left: '10%',
        width: '80%',
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}: {c}'
        },
        data: stages,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        }
      }
    ]
  };
}

export function renderFunnel1(metrics) {
  funnel1Chart = getChartInstance("funnel1Chart_echarts");
  if (!funnel1Chart) return;

  const stages = [
    { name: "Impressions", value: metrics.Impressions },
    { name: "Reach", value: metrics.Reach },
    { name: "Link Clicks", value: metrics.LinkClicks },
    { name: "Landing Views", value: metrics.LandingView }
  ];

  funnel1Chart.setOption(buildFunnelOption("Reach & Traffic", stages));
}

export function renderFunnel2(metrics) {
  funnel2Chart = getChartInstance("funnel2Chart_echarts");
  if (!funnel2Chart) return;

  const stages = [
    { name: "Landing Views", value: metrics.LandingView },
    { name: "Add To Cart", value: metrics.AddToCarts },
    { name: "Initiate Checkout", value: metrics.InitiateCheckout },
    { name: "Purchases", value: metrics.Purchases }
  ];

  funnel2Chart.setOption(buildFunnelOption("Conversion", stages));
}

export function destroyFunnelCharts() {
  destroyChart("funnel1Chart_echarts");
  funnel1Chart = null;

  destroyChart("funnel2Chart_echarts");
  funnel2Chart = null;
}
