(function () {
  function addCounter(textarea) {
    if (textarea.dataset.buCounter) return;
    textarea.dataset.buCounter = "1";

    const counter = document.createElement("div");
    counter.style.cssText = "font-size:0.78em;text-align:right;margin-top:2px;pointer-events:none;";

    function update() {
      const len = textarea.value.length;
      counter.textContent = len > 0 ? `${len} chars` : "";
      counter.style.color = len > 499 ? "var(--color-b-danger)" : "var(--color-b-muted)";
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