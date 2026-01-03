// data/csvLoader.js
export function loadCsvFromUrl(url) {
  const busted = url + "?v=" + Date.now();
  return fetch(busted, { cache: "no-store" })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load CSV: " + res.status);
      }
      return res.text();
    })
    .then(text => parseCsvText(text));
}

export function loadCsvFromFile(file) {
  return file.text().then(text => parseCsvText(text));
}

function parseCsvText(text) {
  return new Promise((resolve, reject) => {
    if (!window.Papa) {
      reject(new Error("PapaParse not loaded"));
      return;
    }

    window.Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: results => resolve(results.data),
      error: err => reject(err)
    });
  });
}
