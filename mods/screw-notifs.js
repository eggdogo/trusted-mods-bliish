(function () {
  function clickMarkAllRead() {
    // Find bliish's own "Mark all as read" button by its text content
    const buttons = document.querySelectorAll("button");
    for (const btn of buttons) {
      if (btn.textContent.trim().toLowerCase().includes("mark all")) {
        btn.click();
        return true;
      }
    }
    return false;
  }

  function hasUnread() {
    // unread notif rows have a dot indicator
    return !!document.querySelector(".notif-unread-dot, .skel-circle, [class*='unread']");
  }

  // Watch for the toolbar to appear on the notifications page
  const obs = new MutationObserver(() => {
    if (!location.pathname.startsWith("/notifications")) return;
    clickMarkAllRead();
  });

  obs.observe(document.body, { childList: true, subtree: true });

  // Also try immediately if already on the page
  if (location.pathname.startsWith("/notifications")) {
    clickMarkAllRead();
  }
})();