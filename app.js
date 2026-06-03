/**
 * Alex Art & Graphics - Global Core Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initBackToTop();
  initFAQs();
  initFAQPage();
  initPortfolioFilter();
  initQuoteModal();
  initFormSubmissions();
  initInnerHero();
  initScrollReveal();
  initHeroSlider();
  initPaymentAnimations();
});

/**
 * Sticky Header Logic
 */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/**
 * Mobile Menu Toggle & Dropdown
 */
function initMobileMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const servicesDropdown = document.querySelector('.nav-item.dropdown');

  if (!burgerMenu || !navMenu) return;

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Services dropdown click on mobile
  if (servicesDropdown) {
    const dropdownLink = servicesDropdown.querySelector('.nav-link');
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');
      }
    });
  }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * FAQ Accordion Slider
 */
function initFAQs() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = '0px';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Portfolio Filters
 */
function initPortfolioFilter() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (tabBtns.length === 0 || portfolioItems.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        item.style.transform = 'scale(0.85)';
        item.style.opacity = '0';
        
        setTimeout(() => {
          if (filterValue === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
              item.style.opacity = '1';
            }, 50);
          } else {
            if (item.classList.contains(filterValue)) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
              }, 50);
            } else {
              item.style.display = 'none';
            }
          }
        }, 300);
      });
    });
  });
}

/**
 * Quote Modal System
 */
function initQuoteModal() {
  const quoteModal = document.querySelector('.quote-modal');
  const openBtns = document.querySelectorAll('.btn-quote-trigger');
  const closeBtn = document.querySelector('.modal-close');

  if (!quoteModal) return;

  const openModal = () => {
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    quoteModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Form Submissions and Validation (Interactive Feedback)
 */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const successAlert = form.querySelector('.success-alert');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      const requiredInputs = form.querySelectorAll('[required]');
      let allValid = true;
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          allValid = false;
          input.style.borderColor = '#FF3B30';
          setTimeout(() => {
            input.style.borderColor = '';
          }, 3000);
        }
      });

      if (!allValid) {
        alert('Please fill out all required fields.');
        return;
      }

      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle>
            <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"></path>
          </svg>
          Processing...
        `;

        if (!document.getElementById('spin-keyframes')) {
          const style = document.createElement('style');
          style.id = 'spin-keyframes';
          style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
          document.head.appendChild(style);
        }

        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          if (successAlert) {
            successAlert.style.display = 'block';
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            setTimeout(() => {
              successAlert.style.display = 'none';
            }, 8000);
          } else {
            alert('Thank you! Your submission has been received. Our team will contact you shortly.');
          }

          const parentModal = form.closest('.quote-modal');
          if (parentModal) {
            setTimeout(() => {
              parentModal.classList.remove('active');
              document.body.style.overflow = 'auto';
              successAlert.style.display = 'none';
            }, 2500);
          }
        }, 1500);
      }
    });
  });

  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(fileInput => {
    const parentLabel = fileInput.closest('.form-file-upload');
    if (!parentLabel) return;

    const originalText = parentLabel.querySelector('p').innerHTML;

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const fileNames = Array.from(fileInput.files).map(f => f.name).join(', ');
        parentLabel.querySelector('p').innerHTML = `<strong>Selected:</strong> ${fileNames}`;
        parentLabel.style.borderColor = '#FFD400';
      } else {
        parentLabel.querySelector('p').innerHTML = originalText;
        parentLabel.style.borderColor = '';
      }
    });
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Scroll Reveal Animation Logic via Intersection Observer
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // Trigger slightly before element enters view
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('revealed');
        }, delay);
        
        // Stop observing once animation has run
        revealObserver.unobserve(element);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * Hero Slider Logic
 */
function initHeroSlider() {
  const sliderSection = document.querySelector('.hero-slider-section');
  if (!sliderSection) return;

  const slides = sliderSection.querySelectorAll('.slide');
  const dots = sliderSection.querySelectorAll('.dot');
  const prevArrow = sliderSection.querySelector('.prev-arrow');
  const nextArrow = sliderSection.querySelector('.next-arrow');
  
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 5000;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextArrow) {
    nextArrow.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevArrow) {
    prevArrow.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(index);
      startAutoplay();
    });
  });

  // Pause on hover
  sliderSection.addEventListener('mouseenter', stopAutoplay);
  sliderSection.addEventListener('mouseleave', startAutoplay);

  // Mobile Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      nextSlide();
      startAutoplay();
    } else if (touchEndX - touchStartX > threshold) {
      prevSlide();
      startAutoplay();
    }
  }

  // Start initialization
  showSlide(0);
  startAutoplay();
}

/**
 * FAQ Page Interactive Filtering, Search & Highlight Logic
 */
function initFAQPage() {
  const searchInput = document.getElementById('faq-search-input');
  const clearBtn = document.getElementById('faq-search-clear');
  const resetBtn = document.getElementById('faq-search-reset');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const faqItems = document.querySelectorAll('.faq-content-area .faq-item');
  const categoryGroups = document.querySelectorAll('.faq-category-group');
  const noResultsContainer = document.getElementById('faq-no-results-container');
  const queryPlaceholder = document.getElementById('search-query-placeholder');

  // Verify we are actually on the FAQ page before running
  if (!searchInput && categoryBtns.length === 0) return;

  // Cache original text elements for high-precision search highlighting
  faqItems.forEach(item => {
    const qEl = item.querySelector('.faq-header h3');
    const aEl = item.querySelector('.faq-body-content p');
    if (qEl && !qEl.dataset.original) qEl.dataset.original = qEl.innerHTML;
    if (aEl && !aEl.dataset.original) aEl.dataset.original = aEl.innerHTML;
  });

  // Helper function to safely highlight matches inside question and answer elements
  function highlightText(element, query) {
    const originalText = element.dataset.original || element.innerHTML;
    if (!query) {
      element.innerHTML = originalText;
      return;
    }

    // First strip out any existing highlighted wrappers to prevent duplication
    const cleanText = originalText.replace(/<span class="highlight-match">([^<]*)<\/span>/gi, '$1');

    // Safe regex escape
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    // Wrap matching terms in highlight-match span tags
    element.innerHTML = cleanText.replace(regex, '<span class="highlight-match">$1</span>');
  }

  // Helper function to restore all elements back to their pristine cache versions
  function restoreOriginalTexts() {
    faqItems.forEach(item => {
      const qEl = item.querySelector('.faq-header h3');
      const aEl = item.querySelector('.faq-body-content p');
      if (qEl && qEl.dataset.original) qEl.innerHTML = qEl.dataset.original;
      if (aEl && aEl.dataset.original) aEl.innerHTML = aEl.dataset.original;
    });
  }

  // Core Search Logic
  function performSearch(query) {
    const trimmedQuery = query.trim().toLowerCase();

    // Toggle Clear button visibility based on input
    if (clearBtn) {
      clearBtn.style.display = trimmedQuery ? 'flex' : 'none';
    }

    // Force "All Questions" category active to execute global search across all groups
    categoryBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === 'all') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (!trimmedQuery) {
      // Restore all original elements if search cleared
      restoreOriginalTexts();
      
      categoryGroups.forEach(group => {
        group.style.display = 'block';
      });

      faqItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('active');
        const body = item.querySelector('.faq-body');
        if (body) body.style.maxHeight = '0px';
      });

      if (noResultsContainer) {
        noResultsContainer.style.display = 'none';
      }
      return;
    }

    let totalVisibleCount = 0;

    // Filter individual items
    faqItems.forEach(item => {
      const qEl = item.querySelector('.faq-header h3');
      const aEl = item.querySelector('.faq-body-content p');

      const questionText = (qEl ? qEl.dataset.original || qEl.textContent : '').toLowerCase();
      const answerText = (aEl ? aEl.dataset.original || aEl.textContent : '').toLowerCase();

      const isMatch = questionText.includes(trimmedQuery) || answerText.includes(trimmedQuery);

      if (isMatch) {
        item.style.display = 'block';
        totalVisibleCount++;

        // Apply visual highlights to matching words
        if (qEl) highlightText(qEl, trimmedQuery);
        if (aEl) highlightText(aEl, trimmedQuery);
      } else {
        // Hide unmatched items and close accordion safely
        item.style.display = 'none';
        item.classList.remove('active');
        const body = item.querySelector('.faq-body');
        if (body) body.style.maxHeight = '0px';
      }
    });

    // Toggle category group containers based on visible children count
    categoryGroups.forEach(group => {
      let visibleInGroup = 0;
      const groupItems = group.querySelectorAll('.faq-item');
      groupItems.forEach(item => {
        if (item.style.display !== 'none') {
          visibleInGroup++;
        }
      });

      if (visibleInGroup > 0) {
        group.style.display = 'block';
      } else {
        group.style.display = 'none';
      }
    });

    // Handle Empty/No Results state
    if (noResultsContainer) {
      if (totalVisibleCount === 0) {
        noResultsContainer.style.display = 'block';
        if (queryPlaceholder) {
          queryPlaceholder.textContent = `"${query}"`;
        }
      } else {
        noResultsContainer.style.display = 'none';
      }
    }
  }

  // Core Category Filtering Logic
  function applyCategoryFilter(selectedCategory) {
    // Reset search input
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    if (noResultsContainer) noResultsContainer.style.display = 'none';

    // Clear highlights
    restoreOriginalTexts();

    // Close all open FAQ items across all categories
    faqItems.forEach(item => {
      item.classList.remove('active');
      const body = item.querySelector('.faq-body');
      if (body) body.style.maxHeight = '0px';
    });

    // Toggle visibility based on category choice
    categoryGroups.forEach(group => {
      const groupCategory = group.getAttribute('data-category');

      if (selectedCategory === 'all') {
        group.style.display = 'block';
        const items = group.querySelectorAll('.faq-item');
        items.forEach(item => {
          item.style.display = 'block';
        });
      } else if (groupCategory === selectedCategory) {
        group.style.display = 'block';
        const items = group.querySelectorAll('.faq-item');
        items.forEach(item => {
          item.style.display = 'block';
        });
      } else {
        group.style.display = 'none';
        const items = group.querySelectorAll('.faq-item');
        items.forEach(item => {
          item.style.display = 'none';
        });
      }
    });
  }

  // Attach search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  // Clear button click trigger
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      performSearch('');
    });
  }

  // Reset button in No Results state
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
      }
      performSearch('');
    });
  }

  // Category navigation items
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');

      // Update active styling class
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      applyCategoryFilter(cat);

      // Scroll smoothly to navigation results on mobile
      if (window.innerWidth <= 1024) {
        const layoutEl = document.querySelector('.faq-content-area');
        if (layoutEl) {
          layoutEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/**
 * Payment Methods Animation Logic
 */
function initPaymentAnimations() {
  const paymentCards = document.querySelectorAll('.payment-logo-card');
  
  if (paymentCards.length === 0) return;

  // Setup Intersection Observer for scroll reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const paymentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        // Add reveal-in class to trigger animation
        card.classList.add('reveal-in');
        // Add floating animation for continuous gentle motion
        card.classList.add('floating');
        // Stop observing after animation triggers
        paymentObserver.unobserve(card);
      }
    });
  }, observerOptions);

  // Observe each payment card
  paymentCards.forEach(card => {
    paymentObserver.observe(card);
  });
}

/**
 * Standardize and inject a single reusable inner hero markup into all pages.
 */
function initInnerHero() {
  const heroes = document.querySelectorAll('section.inner-hero');
  if (!heroes || heroes.length === 0) return;

  heroes.forEach(section => {
    // preserve any existing data-reveal attribute
    const revealAttr = section.getAttribute('data-reveal') || '';

    // Derive title from existing H1 or data attribute
    const existingH1 = section.querySelector('h1');
    const title = (existingH1 && existingH1.textContent.trim()) || section.getAttribute('data-hero-title') || document.title || '';

    // Derive breadcrumbs if present, otherwise build a simple one
    let breadcrumbsEl = section.querySelector('.breadcrumbs');
    let breadcrumbsHTML = '';
    if (breadcrumbsEl) {
      breadcrumbsHTML = breadcrumbsEl.innerHTML;
    } else {
      const homeLink = '<a href="index.html">Home</a>';
      breadcrumbsHTML = `${homeLink}<span>&bull;</span><span>${title}</span>`;
    }

    // Build standardized hero markup
    const heroHTML = `
      <div class="hero-decor" aria-hidden="true">
        <span class="hero-shape shape-1"></span>
        <span class="hero-shape shape-2"></span>
        <span class="hero-shape shape-3"></span>
      </div>
      <div class="container">
        <div class="hero-row">
          <div class="hero-text">
            <h1 class="animate-fade-up">${title}</h1>
            <div class="breadcrumbs animate-fade-up delay-1">${breadcrumbsHTML}</div>
          </div>
        </div>
      </div>
    `;

    // Inject the markup and ensure attributes stay
    section.innerHTML = heroHTML;
    if (revealAttr) section.setAttribute('data-reveal', revealAttr);

    // Ensure background image is the canonical hero image (CSS fallback exists)
    section.style.backgroundImage = "url('assets/hero img.png')";
  });
}

