// utils/logger.js
export function log(scope, message, data) {
  console.log(
    `%c[${scope}]`,
    "color:#22c55e;font-weight:bold",
    message,
    data ?? ""
  );
}

export function error(scope, message, data) {
  console.error(
    `%c[${scope}]`,
    "color:#ef4444;font-weight:bold",
    message,
    data ?? ""
  );
}
