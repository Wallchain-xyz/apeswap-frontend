(function initTheme() {
  var theme = localStorage.getItem("theme-ui-color-mode") || "light";
  if (theme === "dark") {
    document.querySelector("html").setAttribute('data-theme', 'dark');
    document.querySelector("html").setAttribute('style', 'color-scheme: dark;');
    document.querySelector('html').classList.add('dark')
  }
})();
