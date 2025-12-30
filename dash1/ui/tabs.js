// ui/tabs.js
import { setPlatform } from "../state/store.js";

function formatLabel(p) {
  if (p === "All") return "All";
  return p.charAt(0).toUpperCase() + p.slice(1);
}

export function renderPlatformTabs(platforms, active = "All") {
  const container = document.getElementById("platformTabs");
  container.innerHTML = "";

  ["All", ...platforms].forEach(p => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.dataset.platform = p;
    btn.textContent = formatLabel(p);

    if (p === active) btn.classList.add("active");

    btn.onclick = () => {
      container.querySelectorAll(".tab-btn")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setPlatform(p);
    };

    container.appendChild(btn);
  });
}
