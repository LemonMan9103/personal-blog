// theme toggle: adds/removes class "light" on <html> and stores preference
(function () {
  const key = 'site-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
      toggle && (toggle.textContent = 'Light');
    } else {
      root.classList.remove('light');
      toggle && (toggle.textContent = 'Dark');
    }
  }

  // init
  const saved = localStorage.getItem(key);
  if (saved) setTheme(saved);
  else {
    // default: dark; but respect prefers-color-scheme if explicitly light
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const isLight = root.classList.contains('light');
      const next = isLight ? 'dark' : 'light';
      setTheme(next);
      localStorage.setItem(key, next);
    });
  }
})();
