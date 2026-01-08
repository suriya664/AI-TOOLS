/**
 * Theme Switcher for Gama AI
 * Provides light/dark theme toggle functionality
 */

class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.getStoredTheme() || 'dark';
    this.init();
  }

  init() {
    // Apply stored theme on load
    this.applyTheme(this.currentTheme);

    // Create theme switcher button
    this.createThemeButton();

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }

  createThemeButton() {
    // Check if button already exists
    if (document.getElementById('theme-switcher')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'theme-switcher';
    button.className = 'theme-switcher-btn';
    button.setAttribute('aria-label', 'Toggle theme');
    button.innerHTML = this.currentTheme === 'dark' 
      ? '<i class="bi bi-sun"></i>' 
      : '<i class="bi bi-moon"></i>';

    button.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Add to navbar if it exists, otherwise add to body
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
      const navbarButtons = navbar.querySelector('.navbar-buttons, .d-flex.gap-2');
      if (navbarButtons) {
        navbarButtons.insertBefore(button, navbarButtons.firstChild);
      } else {
        navbar.appendChild(button);
      }
    } else {
      document.body.appendChild(button);
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    this.storeTheme(this.currentTheme);
  }

  applyTheme(theme) {
    const html = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    } else {
      html.setAttribute('data-theme', 'dark');
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    }

    // Update button icon
    const button = document.getElementById('theme-switcher');
    if (button) {
      button.innerHTML = theme === 'dark' 
        ? '<i class="bi bi-sun"></i>' 
        : '<i class="bi bi-moon"></i>';
    }

    // Trigger custom event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  getStoredTheme() {
    try {
      return localStorage.getItem('gama-ai-theme');
    } catch (e) {
      return null;
    }
  }

  storeTheme(theme) {
    try {
      localStorage.setItem('gama-ai-theme', theme);
    } catch (e) {
      console.warn('Could not store theme preference');
    }
  }
}

// Initialize theme switcher when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
  });
} else {
  new ThemeSwitcher();
}

