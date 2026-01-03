// data/dataNormalizer.js
import { parseDateFlexible, toISODate } from "./dateUtils.js";

export function normalizeRows(rows) {
  const isoToDisplayMap = {};

  const normalized = rows.map(r => {
    const dateObj = parseDateFlexible(r.Date);
    const iso = dateObj ? toISODate(dateObj) : null;

    if (iso && !isoToDisplayMap[iso]) {
      isoToDisplayMap[iso] = r.Date;
    }

    return {
      ...r,
      Platform: r.Platform ? String(r.Platform).toLowerCase() : "unknown",
      _date_iso: iso
    };
  });

  return { rows: normalized, isoToDisplayMap };
}

export function toNumber(v) {
  if (v === null || v === undefined || v === "") return 0;
  return Number(String(v).replace(/,/g, "")) || 0;
}
