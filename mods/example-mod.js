(function() {
  console.log("[BU mod] Example mod running on", bliishUnlocked.pathname);
  if (bliishUnlocked.pathname.startsWith("/feed")) {
    const banner = document.createElement("div");
    banner.textContent = "example mod is active!";
    banner.style.cssText = `
      background: var(--color-b-primary);
      color: var(--color-b-bar-text);
      text-align: center;
      padding: 6px;
      font-size: 0.85em;
    `;
    document.querySelector(".app-content")?.prepend(banner);
  }
})();
 
