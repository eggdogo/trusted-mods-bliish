(function () {
  const LIMIT = 500;

  function addCounter(textarea) {
    if (textarea.dataset.buCounter) return;
    textarea.dataset.buCounter = "1";

    const counter = document.createElement("div");
    counter.style.cssText = "font-size:0.78em;color:var(--color-b-danger);text-align:right;margin-top:2px;";

    function update() {
      const remaining = LIMIT - textarea.value.length;
      counter.textContent = remaining < 100 ? `${remaining} left` : "";
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