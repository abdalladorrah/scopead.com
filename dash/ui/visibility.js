// ui/visibility.js
export function updateVisibility(platform) {
  const allSection = document.getElementById("allPlatformsSection");
  const singleSection = document.getElementById("singlePlatformSection");
  const compSection = document.getElementById("comparisonSection");

  if (allSection && singleSection) {
    if (platform === "All") {
      allSection.style.display = "block";
      singleSection.style.display = "none";
    } else {
      allSection.style.display = "none";
      singleSection.style.display = "block";
    }
  }

  if (compSection) {
    if (platform === "All") {
      // Show comparison section
      compSection.style.display = "block";
    } else {
      // Hide comparison section
      compSection.style.display = "none";
    }
  }
}
