// ABOUTME: Dark mode toggle functionality for minimal 90s theme
// ABOUTME: Uses cookies to persist user preference across sessions

(function() {
  'use strict';

  // Cookie functions
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Theme functions
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    setCookie('theme', theme, 365);
    updateToggleButton(theme);
  }

  function updateToggleButton(theme) {
    var button = document.getElementById('theme-toggle-btn');
    if (button) {
      button.innerHTML = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  // Initialize theme on page load
  function initTheme() {
    var savedTheme = getCookie('theme') || 'light';
    setTheme(savedTheme);
  }

  // Set up event listeners
  function setupThemeToggle() {
    var button = document.getElementById('theme-toggle-btn');
    if (button) {
      button.onclick = toggleTheme;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initTheme();
      setupThemeToggle();
    });
  } else {
    initTheme();
    setupThemeToggle();
  }
})();