# Site Restructuring Guide

## Overview

The site has been restructured from a single-page application (SPA) into a modular component-based architecture for better maintainability, scalability, and performance.

## New Structure

```
/
├── components/                    # Reusable HTML components
│   ├── header.html               # Navigation bar
│   ├── footer.html               # Footer with links
│   ├── config.json               # Component configuration
│   ├── README.md                 # Component documentation
│   └── sections/                 # Page sections
│       ├── hero.html
│       ├── features.html
│       ├── how-it-works.html
│       ├── use-cases.html
│       ├── demo.html
│       ├── tools.html
│       ├── pricing.html
│       ├── testimonials.html
│       ├── integrations.html
│       ├── cta.html
│       ├── blog.html
│       ├── faq.html
│       ├── contact.html
│       └── newsletter.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       └── components.js        # Component loader system
├── index.html                    # Original (backup)
├── index-new.html               # New modular version
└── RESTRUCTURING_GUIDE.md      # This file
```

## Benefits

### 1. **Maintainability**
- Update components in one place
- Changes propagate automatically
- Easier to locate and fix issues

### 2. **Scalability**
- Add new sections without touching main file
- Reuse components across pages
- Better code organization

### 3. **Performance**
- Components can be cached
- Lazy loading capabilities
- Smaller initial page load

### 4. **Team Collaboration**
- Multiple developers can work simultaneously
- Clear separation of concerns
- Reduced merge conflicts

### 5. **Layout Clarity**
- Each section is self-contained
- Easier to understand page structure
- Better documentation

## Component Loader System

The `assets/js/components.js` file provides a `ComponentLoader` class that:

- Loads HTML components dynamically
- Caches components for performance
- Reinitializes scripts after loading
- Handles errors gracefully

### Usage Example

```javascript
// Load a single component
await componentLoader.loadComponent(
  'components/header.html',
  '#header-container'
);

// Load multiple components
await componentLoader.loadComponents([
  { path: 'components/header.html', target: '#header-container' },
  { path: 'components/footer.html', target: '#footer-container' }
]);
```

## Migration Steps

### Step 1: Extract Remaining Sections

The following sections still need to be extracted from `index.html`:

1. Use Cases (`components/sections/use-cases.html`)
2. Demo Video (`components/sections/demo.html`)
3. Tools (`components/sections/tools.html`)
4. Pricing (`components/sections/pricing.html`)
5. Testimonials (`components/sections/testimonials.html`)
6. Integrations (`components/sections/integrations.html`)
7. CTA (`components/sections/cta.html`)
8. Blog (`components/sections/blog.html`)
9. FAQ (`components/sections/faq.html`)
10. Contact (`components/sections/contact.html`)
11. Newsletter (`components/sections/newsletter.html`)

### Step 2: Update index.html

Replace the monolithic structure with component placeholders:

```html
<main id="main-content">
  <div id="hero-section"></div>
  <div id="features-section"></div>
  <!-- ... other sections ... -->
</main>
```

### Step 3: Initialize Component Loader

Add initialization script:

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  await componentLoader.loadComponents([
    { path: 'components/header.html', target: '#header-container' },
    { path: 'components/footer.html', target: '#footer-container' },
    { path: 'components/sections/hero.html', target: '#hero-section' },
    // ... load all sections
  ]);
});
```

## Implementation Options

### Option 1: Dynamic Loading (Current)
- Components loaded via JavaScript
- Works with any static hosting
- Requires JavaScript enabled
- Slight performance overhead

### Option 2: Server-Side Includes
- Components inlined at server level
- No JavaScript required
- Better performance
- Requires server support (Apache/Nginx)

### Option 3: Build Process
- Components inlined at build time
- Best performance
- Requires build tool (Gulp, Webpack, etc.)
- Most complex setup

## Next Steps

1. **Complete Section Extraction**: Extract all remaining sections from `index.html`
2. **Test Component Loading**: Verify all components load correctly
3. **Update Other Pages**: Apply component system to other pages (about.html, contact.html, etc.)
4. **Performance Optimization**: Implement caching and lazy loading
5. **Documentation**: Update README with new structure

## Notes

- Original `index.html` is preserved as backup
- Component loader includes error handling
- Components are cached after first load
- AOS animations reinitialize after component load
- Bootstrap components reinitialize automatically

## Troubleshooting

### Components Not Loading
- Check browser console for errors
- Verify file paths are correct
- Ensure server allows CORS for local files
- Use a local server (not file:// protocol)

### Scripts Not Working
- Ensure components.js loads before initialization
- Check that AOS and Bootstrap are loaded
- Verify componentLoader is available globally

### Styling Issues
- Ensure styles.css loads before components
- Check for CSS specificity conflicts
- Verify component HTML structure matches original

