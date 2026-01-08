# Component Structure

This directory contains reusable HTML components for the Gama AI website.

## Directory Structure

```
components/
├── header.html              # Navigation bar component
├── footer.html              # Footer component with links and social media
└── sections/
    ├── hero.html           # Hero section with main CTA
    ├── features.html       # Features showcase section
    ├── how-it-works.html   # Process steps section
    ├── use-cases.html      # Use cases section
    ├── demo.html          # Demo video section
    ├── tools.html         # AI tools showcase
    ├── pricing.html       # Pricing plans section
    ├── testimonials.html  # Customer testimonials
    ├── integrations.html  # Integration partners
    ├── cta.html           # Call-to-action section
    ├── blog.html          # Blog preview section
    ├── faq.html           # FAQ accordion section
    ├── contact.html       # Contact form section
    └── newsletter.html    # Newsletter signup section
```

## Usage

### Method 1: Using Component Loader (Recommended)

The component loader (`assets/js/components.js`) automatically loads components:

```html
<!-- In your HTML -->
<div id="header-container"></div>

<script>
  componentLoader.loadComponent('components/header.html', '#header-container');
</script>
```

### Method 2: Server-Side Includes

If using a server with SSI support (Apache, Nginx):

```html
<!--#include file="components/header.html" -->
```

### Method 3: Build Process

Use a build tool (Gulp, Webpack, etc.) to inline components at build time.

## Benefits

1. **Maintainability**: Update components in one place
2. **Reusability**: Use same components across multiple pages
3. **Performance**: Components can be cached
4. **Scalability**: Easy to add new sections
5. **Team Collaboration**: Different developers can work on different components

## Component Development Guidelines

1. Each component should be self-contained
2. Use semantic HTML
3. Include necessary data attributes for JavaScript
4. Keep components focused on a single responsibility
5. Document any dependencies or requirements

## Adding New Components

1. Create HTML file in appropriate directory
2. Ensure it follows the existing structure
3. Update component loader if needed
4. Test across all pages that use it

