(function () {
  function getLimit() {
    // Bliish puts capabilities on the auth state — try a few known locations
    try {
      const caps =
        window.__bliishAuthState?.capabilities ||
        window.__bliishAppState?.capabilities ||
        window.__bliish?.capabilities ||
        [];
      if (Array.isArray(caps) && caps.includes("extended_post_length")) return 1500;
    } catch (e) {}
    return 500;
  }

  function addCounter(textarea) {
    if (textarea.dataset.buCounter) return;
    textarea.dataset.buCounter = "1";

    const limit = getLimit();
    const counter = document.createElement("div");
    counter.style.cssText = "font-size:0.78em;text-align:right;margin-top:2px;pointer-events:none;";

    function update() {
      const len = textarea.value.length;
      const remaining = limit - len;
      counter.textContent = len > 0 ? `${remaining} / ${limit}` : "";
      counter.style.color = remaining < 100 ? "var(--color-b-danger)" : "var(--color-b-muted)";
    }

    textarea.addEventListener("input", update);
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    update();
  }

  function scan() {
    document.querySelectorAll("textarea").forEach(addCounter);
  }

  scan();
  const obs = new MutationObserver(scan);
  obs.observe(document.body, { childList: true, subtree: true });
})();