/**
 * Component Loader System
 * Loads HTML components dynamically for better maintainability
 */

class ComponentLoader {
  constructor() {
    this.cache = new Map();
    this.loadedComponents = new Set();
  }

  /**
   * Load a component from a file
   * @param {string} path - Path to the component file
   * @param {string} targetSelector - CSS selector for the target element
   * @param {string} position - 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
   */
  async loadComponent(path, targetSelector, position = 'beforeend') {
    // Check if already loaded
    if (this.loadedComponents.has(path)) {
      console.warn(`Component ${path} already loaded`);
      return;
    }

    try {
      // Check cache first
      if (this.cache.has(path)) {
        this.insertComponent(this.cache.get(path), targetSelector, position);
        this.loadedComponents.add(path);
        return;
      }

      // Fetch component
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${path} (${response.status})`);
      }

      const html = await response.text();
      
      // Cache the component
      this.cache.set(path, html);
      
      // Insert component
      this.insertComponent(html, targetSelector, position);
      this.loadedComponents.add(path);

      // Reinitialize scripts if needed
      this.reinitializeScripts();
    } catch (error) {
      console.error(`Error loading component ${path}:`, error);
      // Fallback: show error message in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const target = document.querySelector(targetSelector);
        if (target) {
          target.insertAdjacentHTML(position, `<div class="alert alert-warning">Failed to load component: ${path}</div>`);
        }
      }
    }
  }

  /**
   * Insert component HTML into target element
   */
  insertComponent(html, targetSelector, position) {
    const target = document.querySelector(targetSelector);
    if (!target) {
      console.error(`Target element not found: ${targetSelector}`);
      return;
    }

    // Create a temporary container to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();

    // Insert each node
    const nodes = Array.from(temp.childNodes);
    nodes.forEach(node => {
      target.insertAdjacentElement(position, node);
    });
  }

  /**
   * Reinitialize scripts and event listeners after component load
   */
  reinitializeScripts() {
    // Reinitialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    // Reinitialize Bootstrap tooltips and popovers
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });

      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      popoverTriggerList.forEach(popoverTriggerEl => {
        new bootstrap.Popover(popoverTriggerEl);
      });
    }

    // Trigger custom event for component loaded
    window.dispatchEvent(new CustomEvent('componentLoaded'));
  }

  /**
   * Load multiple components
   * @param {Array} components - Array of {path, target, position} objects
   */
  async loadComponents(components) {
    const promises = components.map(comp => 
      this.loadComponent(comp.path, comp.target, comp.position || 'beforeend')
    );
    await Promise.all(promises);
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    this.loadedComponents.clear();
  }
}

// Create global instance
const componentLoader = new ComponentLoader();

// Auto-load components marked with data-component attribute
document.addEventListener('DOMContentLoaded', () => {
  const componentElements = document.querySelectorAll('[data-component]');
  
  componentElements.forEach(element => {
    const componentPath = element.getAttribute('data-component');
    const position = element.getAttribute('data-position') || 'beforeend';
    
    if (componentPath) {
      componentLoader.loadComponent(componentPath, element.parentElement ? 
        `[data-component="${componentPath}"]` : 'body', position);
    }
  });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComponentLoader;
}

