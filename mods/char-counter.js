(function () {
  const STYLE_ID = "bu-char-counter-style";
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .bu-counter { 
        font-size: 0.78em;
        text-align: right;
        margin-top: 2px;
        pointer-events: none;
        color: var(--color-b-muted);
      }
      .bu-counter.red { color: var(--color-b-danger) !important; }
    `;
    document.head.appendChild(style);
  }

  function addCounter(textarea) {
    if (textarea.dataset.buCounter) return;
    // make sure it's actually a post/comment box, not a settings input
    if (textarea.rows < 2) return;
    textarea.dataset.buCounter = "1";

    const counter = document.createElement("div");
    counter.className = "bu-counter";

    function update() {
      const len = textarea.value.length;
      counter.textContent = len > 0 ? `${len} chars` : "";
      counter.classList.toggle("red", len >= 500);
    }

    textarea.addEventListener("input", update);

    // append after the textarea's parent so React doesn't nuke it
    const parent = textarea.parentNode;
    parent.appendChild(counter);
    update();
  }

  function scan() {
    document.querySelectorAll("textarea:not([data-bu-counter])").forEach(addCounter);
  }

  scan();
  const obs = new MutationObserver(scan);
  obs.observe(document.body, { childList: true, subtree: true });
})();