(function () {
  function unlock() {
    document.querySelectorAll(".profile-edit-social-row .checkbox-input").forEach(cb => {
      cb.disabled = false;
      cb.closest(".checkbox")?.classList.remove("checkbox--disabled");
    });

    document.querySelectorAll(".profile-edit-social-field input").forEach(input => {
      input.removeAttribute("pattern");
      input.removeAttribute("type");
      input.setAttribute("type", "text");
    });
  }

  unlock();
  const obs = new MutationObserver(unlock);
  obs.observe(document.body, { childList: true, subtree: true });
})();