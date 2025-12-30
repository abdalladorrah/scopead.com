// ui/filters.js
import { setDateRange, setPlatform } from "../state/store.js";
import { computePresetRange } from "../data/dateUtils.js";

export function initFilters() {
  const preset = document.getElementById("presetSelect");
  const dateFrom = document.getElementById("dateFrom");
  const dateTo = document.getElementById("dateTo");
  const applyBtn = document.getElementById("applyRange");
  const resetBtn = document.getElementById("resetBtn");

  preset.addEventListener("change", () => {
    if (preset.value === "custom") return;
    const range = computePresetRange(preset.value);
    dateFrom.value = range.from;
    dateTo.value = range.to;
    setDateRange(range.from, range.to);
  });

  applyBtn.addEventListener("click", () => {
    preset.value = "custom";
    setDateRange(dateFrom.value, dateTo.value);
  });

  resetBtn.addEventListener("click", () => {
    preset.value = "all";
    dateFrom.value = "";
    dateTo.value = "";
    setPlatform("All");
    setDateRange("", "");
  });
}
