(function () {
  const id = "bu-compact-mode";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    /* tighten up feed posts */
    [data-timeline-item-id] {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
    }

    /* smaller gap between post elements */
    .post-body, .post-content {
      gap: 4px !important;
    }

    /* compress the composer */
    .feed-composer, .post-composer {
      padding: 8px !important;
    }

    /* tighter comments */
    .comment {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }

    /* reduce section bar height */
    .section-bar {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }

    /* shrink profile header padding */
    .app-header-row {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }
  `;

  document.head.appendChild(style);
})();