(function () {
  const PREF_KEY = "bu-compact-level";
  const STYLE_ID = "bu-compact-mode";

  const levels = {
    1: {
      label: "a little",
      css: `
        [data-timeline-item-id] > * { padding-top: 10px !important; padding-bottom: 10px !important; }
        .section-bar { padding-top: 7px !important; padding-bottom: 7px !important; }
        .settings-row { padding-top: 8px !important; padding-bottom: 8px !important; }
      `
    },
    2: {
      label: "medium",
      css: `
        [data-timeline-item-id] > * { padding-top: 6px !important; padding-bottom: 6px !important; }
        .section-bar { padding-top: 5px !important; padding-bottom: 5px !important; font-size: 0.9em !important; }
        .settings-row { padding-top: 5px !important; padding-bottom: 5px !important; }
        .profile-edit-field { padding-top: 5px !important; padding-bottom: 5px !important; }
        .app-content > * + * { margin-top: 3px !important; }
      `
    },
    3: {
      label: "very",
      css: `
        [data-timeline-item-id] > * { padding-top: 3px !important; padding-bottom: 3px !important; }
        [data-timeline-item-id] { margin-bottom: 2px !important; }
        .section-bar { padding-top: 3px !important; padding-bottom: 3px !important; font-size: 0.82em !important; }
        .settings-row { padding-top: 3px !important; padding-bottom: 3px !important; }
        .profile-edit-field { padding-top: 3px !important; padding-bottom: 3px !important; }
        .app-content > * + * { margin-top: 2px !important; }
        .post-actions, .post-footer { padding-top: 2px !important; padding-bottom: 2px !important; }
        .app-header-row { padding-top: 4px !important; padding-bottom: 4px !important; }
        .icon-tile { padding: 6px !important; }
      `
    }
  };

  function applyLevel(level) {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    if (!level || level === 0) {
      style.textContent = "";
      return;
    }
    style.textContent = levels[level]?.css || "";
    localStorage.setItem(PREF_KEY, level);
  }

  function injectPicker() {
    if (!location.pathname.startsWith("/settings")) return;
    if (document.getElementById("bu-compact-picker")) return;

    const form = document.querySelector("#bu-settings-group .profile-edit-form");
    if (!form) return;

    const saved = parseInt(localStorage.getItem(PREF_KEY) || "0");

    const row = document.createElement("div");
    row.className = "settings-row personalization-settings-row";
    row.id = "bu-compact-picker";
    row.innerHTML = `
      <span class="settings-row-label">Compact Mode</span>
      <div style="display:flex;align-items:center;gap:8px;flex:1;">
        <input type="range" id="bu-compact-slider" min="0" max="3" step="1" value="${saved}"
          style="flex:1;cursor:pointer;">
        <span id="bu-compact-label" style="font-size:0.82em;color:var(--color-b-text-secondary);min-width:48px;text-align:right;">
          ${saved === 0 ? "off" : levels[saved].label}
        </span>
      </div>
    `;
    form.appendChild(row);

    document.getElementById("bu-compact-slider").addEventListener("input", e => {
      const val = parseInt(e.target.value);
      document.getElementById("bu-compact-label").textContent = val === 0 ? "off" : levels[val].label;
      applyLevel(val);
    });
  }

  const saved = parseInt(localStorage.getItem(PREF_KEY) || "0");
  applyLevel(saved);

  injectPicker();
  const obs = new MutationObserver(() => {
    if (!document.getElementById("bu-compact-picker")) injectPicker();
  });
  obs.observe(document.body, { childList: true, subtree: true });
})();