// state/store.js
import { log } from "../utils/logger.js";
import { aggregate } from "../data/aggregator.js";

const state = {
  rows: [],
  isoMap: {},
  filters: {
    platform: "All",
    from: "",
    to: ""
  }
};

const subscribers = [];

export function subscribe(fn) {
  subscribers.push(fn);
  log("STORE", "Subscriber added", subscribers.length);
}

function notify() {
  log("STORE", "Notify triggered", state.filters);
  const aggregated = aggregate(
    state.rows,
    state.filters.platform,
    state.filters.from,
    state.filters.to
  );
  subscribers.forEach(fn => fn(aggregated, state));
}

export function setRows(rows, isoMap) {
  log("STORE", "setRows called", rows.length);
  state.rows = rows;
  state.isoMap = isoMap;
  notify();
}

export function setPlatform(platform) {
  log("STORE", "Platform changed", platform);
  state.filters.platform = platform;
  notify();
}

export function setDateRange(from, to) {
  log("STORE", "Date range changed", { from, to });
  state.filters.from = from;
  state.filters.to = to;
  notify();
}
