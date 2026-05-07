(function () {
  function formatTime(date) {
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function applyTimestamps() {
    document.querySelectorAll("time[datetime]:not([data-bu-ts])").forEach(el => {
      const date = new Date(el.getAttribute("datetime"));
      if (isNaN(date)) return;
      el.setAttribute("data-bu-ts", "1");
      el.textContent = formatTime(date);
      el.title = date.toISOString();
    });
  }

  applyTimestamps();
  const obs = new MutationObserver(applyTimestamps);
  obs.observe(document.body, { childList: true, subtree: true });
})();