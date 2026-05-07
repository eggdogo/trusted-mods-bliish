(function () {
  const _fetch = window.fetch;
 
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url;
 
    // Only intercept profile save requests
    if (url && url.includes("/api/profile") && init?.method?.toUpperCase() === "PATCH") {
      try {
        let body = init.body;
        if (typeof body === "string") {
          const parsed = JSON.parse(body);
 
          // For every screen_name field, strip validation by just passing the raw value through
          if (parsed.screen_names && typeof parsed.screen_names === "object") {
            const cleaned = {};
            for (const [key, val] of Object.entries(parsed.screen_names)) {
              // Pass value as-is, don't let the client mangle it
              cleaned[key] = val;
            }
            parsed.screen_names = cleaned;
          }
 
          init = { ...init, body: JSON.stringify(parsed) };
        }
      } catch (e) {
        // If parsing fails just pass through unchanged
      }
    }
 
    return _fetch.call(this, input, init);
  };
})();
