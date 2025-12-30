// data/dateUtils.js

export function parseDateFlexible(value) {
  if (!value) return null;

  const str = String(value).trim();

  // ===== ISO date ONLY (yyyy-mm-dd) → LOCAL (no UTC shift)
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // ===== fallback to native parsing (timestamps, full ISO with time, etc.)
  const parsed = Date.parse(str);
  if (!isNaN(parsed)) return new Date(parsed);

  // ===== dd/mm/yyyy or mm/dd/yyyy
  const m = str.match(/(\d{1,4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,4})/);
  if (m) {
    if (m[1].length === 4) {
      // yyyy/mm/dd
      return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }
    // dd/mm/yyyy
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  }

  // ===== numeric (timestamp / excel serial)
  const num = Number(str);
  if (!isNaN(num)) {
    // unix ms timestamp
    if (num > 1e12) return new Date(num);

    // excel serial date
    if (num > 59 && num < 3000000) {
      const excelEpoch = new Date(1899, 11, 30); // LOCAL epoch
      return new Date(excelEpoch.getTime() + num * 86400000);
    }
  }

  return null;
}

// ===== LOCAL yyyy-mm-dd formatter (NO UTC)
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function computePresetRange(preset) {
  const today = new Date();

  if (preset === "all") return { from: "", to: "" };

  if (preset === "month") {
    const y = today.getFullYear();
    const m = today.getMonth();
    return {
      from: toISODate(new Date(y, m, 1)),
      to: toISODate(new Date(y, m + 1, 0))
    };
  }

  const days = Number(preset);
  if (!isNaN(days)) {
    const from = new Date(today);
    from.setDate(today.getDate() - (days - 1));
    return {
      from: toISODate(from),
      to: toISODate(today)
    };
  }

  return { from: "", to: "" };
}
