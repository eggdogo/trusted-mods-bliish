(function () {
  const id = "bu-compact-mode";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    /* tighten feed post cards */
    [data-timeline-item-id] > * {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }

    /* tighter action rows (like/comment buttons) */
    .post-actions, .post-footer {
      padding-top: 4px !important;
      padding-bottom: 4px !important;
    }

    /* reduce gap between posts */
    .app-content > * + * {
      margin-top: 4px !important;
    }

    /* shrink section bars */
    .section-bar {
      padding-top: 5px !important;
      padding-bottom: 5px !important;
      font-size: 0.85em !important;
    }

    /* tighter settings rows */
    .settings-row {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }

    /* smaller profile edit fields */
    .profile-edit-field {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }
  `;

  document.head.appendChild(style);
})();