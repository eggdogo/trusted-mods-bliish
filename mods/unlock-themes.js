const PREF_KEY = "bu-unlocked-theme";
const ALL_THEMES = [
  "", "classicdark", "lucifer", "drbanner", "rainbow", "rainbowdark",
  "420", "stickersafari", "hazardpop", "cottoncandy", "cyberpop",
  "vampiremall", "slimelab", "swirlconsole", "bubblegumterminal",
  "solarflare", "deepsea", "princessvirus", "radioactivecandy", "aero",
  "dorfic", "matrix", "mcbling", "thesocialnetwork", "bos", "obsidian",
  "paper", "flashgames", "thebookstore", "meatthezoo", "goldlight", "golddark"
];

// apply on every page load
const saved = localStorage.getItem(PREF_KEY);
if (saved !== null) {
  if (saved === "") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", saved);
  }
  if (window.__bliishAppThemeState) {
    window.__bliishAppThemeState.theme = saved;
  }
}

// inject picker on settings page
if (location.pathname.startsWith("/settings")) {
  const inject = () => {
    const form = document.querySelector("#bu-settings-group .profile-edit-form");
    if (!form || document.getElementById("bu-theme-unlock")) return;

    const row = document.createElement("div");
    row.className = "settings-row personalization-settings-row";
    row.id = "bu-theme-unlock";
    row.innerHTML = `
      <span class="settings-row-label">Unlocked Theme</span>
      <select id="bu-theme-select"
        style="flex:1;padding:4px 8px;border:1px solid var(--color-b-input-border);
               border-radius:var(--rad-sm);background:var(--color-b-input-bg);
               color:var(--color-b-text);font-size:0.85em;">
        ${ALL_THEMES.map(t => `<option value="${t}" ${t === (saved || "") ? "selected" : ""}>${t || "(default)"}</option>`).join("")}
      </select>
    `;
    form.appendChild(row);

    document.getElementById("bu-theme-select").addEventListener("change", e => {
      const theme = e.target.value;
      localStorage.setItem(PREF_KEY, theme);
      if (theme === "") {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
      if (window.__bliishAppThemeState) window.__bliishAppThemeState.theme = theme;
    });
  };

  const obs = new MutationObserver(inject);
  obs.observe(document.body, { childList: true, subtree: true });
  inject();
}