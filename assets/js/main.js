// Gama AI - Premium Interactions & Animations

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS with premium settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0
    });
  }

  // Premium Navbar Scroll Effect
  const navbar = document.getElementById('mainNav');
  let lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Active Nav Link Highlighting Based on Scroll Position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    const scrollPosition = window.pageYOffset;
    const offset = 150; // Offset for navbar height and detection threshold

    let currentSection = null;

    // Handle hero section (top of page)
    if (scrollPosition < 200) {
      currentSection = 'hero';
    } else {
      // Check each section to see which one is currently in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if section is in viewport with offset
        if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });
    }

    // Update nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      // Remove # from href for comparison
      const linkTarget = href.replace('#', '');
      
      if (linkTarget === currentSection) {
        link.classList.add('active');
      }
    });
  }

  // Throttle function for scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Update active link on scroll (throttled for performance)
  const throttledUpdateActiveNavLink = throttle(updateActiveNavLink, 100);
  window.addEventListener('scroll', throttledUpdateActiveNavLink);
  
  // Update active link on page load
  updateActiveNavLink();

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Update active nav link after scroll
        setTimeout(() => {
          updateActiveNavLink();
        }, 500);
      }
    });
  });

  // Premium Button Ripple Effect
  document.querySelectorAll('.btn-premium, .btn-premium-outline').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Parallax Scroll Effect for Hero Section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = heroSection.querySelector('.hero-container');
      const heroVisual = heroSection.querySelector('.hero-visual');
      
      if (heroContent && scrolled < heroSection.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroSection.offsetHeight) * 0.5;
      }
      
      if (heroVisual && scrolled < heroSection.offsetHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
      }
    });
  }

  // Glass Card Hover Effects with Micro-delays
  document.querySelectorAll('.glass-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Icon Rotation on Hover
  document.querySelectorAll('.feature-icon, .tool-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Scroll-triggered Section Reveals
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-revealed');
        
        // Add staggered animation to children
        const children = entry.target.querySelectorAll('.glass-card');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });

  // Form Submissions with Premium Feedback
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = 'Sending...';
      button.disabled = true;
      button.style.opacity = '0.7';
      
      setTimeout(() => {
        button.textContent = 'Message Sent ✓';
        button.style.background = 'rgba(255, 215, 0, 0.2)';
        button.style.borderColor = 'var(--liquid-gold)';
        button.style.color = 'var(--liquid-gold)';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.style.opacity = '1';
          button.style.background = '';
          button.style.borderColor = '';
          button.style.color = '';
          this.reset();
        }, 3000);
      }, 1500);
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector('.bg-primary form, section:has(form) form');
  if (newsletterForm && !newsletterForm.closest('#contact')) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const input = this.querySelector('input[type="email"]');
      const originalText = button.textContent;
      
      button.textContent = 'Subscribing...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Subscribed ✓';
        button.style.background = 'rgba(255, 215, 0, 0.2)';
        button.style.borderColor = 'var(--liquid-gold)';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.style.background = '';
          button.style.borderColor = '';
          input.value = '';
        }, 3000);
      }, 1500);
    });
  }

  // Video Modal Handling
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('hidden.bs.modal', function() {
      const iframe = this.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        iframe.src = src;
      }
    });
  }

  // Mobile Menu Close on Link Click and Overlay
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navToggle = document.querySelector('.navbar-toggler');

  if (navLinks.length > 0 && navbarCollapse && navToggle) {
    // Close menu when clicking on regular navigation links (not dropdown toggles)
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown toggle
        if (!link.classList.contains('dropdown-toggle') && window.innerWidth < 992) {
          const href = link.getAttribute('href');
          // Only close if it's not a hash link (same page anchor) or if it navigates to a different page
          if (href && !href.startsWith('#') && href !== '#' && href !== '') {
            closeMobileMenu();
          } else if (href && href.startsWith('#')) {
            // For anchor links, close menu after a short delay
            setTimeout(() => {
              if (window.innerWidth < 992) {
                closeMobileMenu();
              }
            }, 300);
          }
        }
      });
    });
    
    // Handle dropdown items - keep dropdown open on mobile for easier navigation
    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        const isMobile = window.innerWidth < 992;
        const dropdown = item.closest('.dropdown');
        
        if (isMobile && dropdown) {
          // On mobile, prevent Bootstrap from auto-closing dropdown
          // Keep it open so users can click either option
          e.stopPropagation();
          
          // Mark item as active for visual feedback
          dropdownItems.forEach(di => di.classList.remove('active'));
          item.classList.add('active');
          
          // Handle navigation
          if (href && !href.startsWith('#') && href !== '#' && href !== '') {
            // Navigate to different page - close menu after navigation starts
            setTimeout(() => {
              if (window.innerWidth < 992) {
                closeMobileMenu();
              }
              window.location.href = href;
            }, 150);
          } else if (href && href.startsWith('#')) {
            // For anchor links on same page, scroll then close menu
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                if (window.innerWidth < 992) {
                  closeMobileMenu();
                }
              }, 600);
            }
          }
        } else {
          // On desktop, allow normal Bootstrap dropdown behavior
          if (href && !href.startsWith('#') && href !== '#' && href !== '') {
            setTimeout(() => {
              closeMobileMenu();
            }, 100);
          }
        }
      });
    });
    
    // Keep dropdown open on mobile when clicking inside dropdown menu
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
      menu.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          // Prevent event from bubbling to Bootstrap's dropdown handler
          // This keeps dropdown open on mobile
          e.stopPropagation();
        }
      });
    });
    
    // Prevent Bootstrap from auto-closing dropdown on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('shown.bs.dropdown', function() {
        if (window.innerWidth < 992) {
          // On mobile, prevent dropdown from closing when clicking items
          const dropdownMenu = this.nextElementSibling;
          if (dropdownMenu) {
            dropdownMenu.addEventListener('click', function(e) {
              // Only prevent closing if clicking on dropdown items
              if (e.target.classList.contains('dropdown-item')) {
                e.stopPropagation();
              }
            }, { capture: true });
          }
        }
      });
    });
    
    // Close dropdown when clicking outside on mobile (but keep main menu open)
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
          const dropdownMenu = dropdown.querySelector('.dropdown-menu');
          if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            if (!dropdown.contains(e.target)) {
              // Close dropdown but keep main menu open
              const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
              if (dropdownToggle) {
                const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                if (bsDropdown) {
                  bsDropdown.hide();
                }
              }
            }
          }
        });
      }
    });
    
    // Close menu when clicking outside (on overlay)
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(e.target) && !navToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
    
    // Close menu function
    function closeMobileMenu() {
      navbarCollapse.classList.remove('show');
      navToggle.classList.add('collapsed');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    
    // Close button handler
    const closeBtn = navbarCollapse.querySelector('.close-menu-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Add menu-open class when menu opens
    navToggle.addEventListener('click', () => {
      setTimeout(() => {
        if (navbarCollapse.classList.contains('show')) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      }, 100);
    });
    
    // Prevent body scroll when menu is open
    if (navbarCollapse) {
      const observer = new MutationObserver(() => {
        if (navbarCollapse.classList.contains('show')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
      observer.observe(navbarCollapse, { attributes: true, attributeFilter: ['class'] });
    }
  }

  // Cursor Glow Effect (Premium Touch)
  let cursorGlow = null;
  
  document.addEventListener('mousemove', (e) => {
    if (!cursorGlow) {
      cursorGlow = document.createElement('div');
      cursorGlow.className = 'cursor-glow';
      document.body.appendChild(cursorGlow);
    }
    
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // Add glow effect to interactive elements
  document.querySelectorAll('a, button, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
      if (cursorGlow) cursorGlow.classList.add('glow-active');
    });
    
    el.addEventListener('mouseleave', function() {
      if (cursorGlow) cursorGlow.classList.remove('glow-active');
    });
  });

  // Console Welcome Message
  console.log('%c Gama AI ', 'background: linear-gradient(135deg, #FFD700, #FFC700); color: #0A0A0A; padding: 10px; font-size: 16px; font-weight: bold;');
  console.log('%c Intelligence Engineered to Perfection ', 'background: #0A0A0A; color: #FFD700; padding: 5px; border: 1px solid #FFD700;');

});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add Ripple Effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 215, 0, 0.4);
    transform: scale(0);
    animation: ripple-animation 600ms ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .cursor-glow {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
    z-index: 9999;
    mix-blend-mode: screen;
  }

  .cursor-glow.glow-active {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.5), rgba(255, 215, 0, 0.2), transparent);
  }

  .section-revealed {
    opacity: 1;
  }

  .glass-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
`;
document.head.appendChild(rippleStyle);

// Smooth Page Load Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
