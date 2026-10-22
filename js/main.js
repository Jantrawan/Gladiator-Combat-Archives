/**
 * Main Shared JavaScript - Gladiator Combat Museum
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mainNav.classList.contains('open')) {
          icon.className = 'fi fi-rr-cross';
        } else {
          icon.className = 'fi fi-rr-menu-burger';
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fi fi-rr-menu-burger';
      }
    });
  }

  // Global Header Search
  const searchForms = document.querySelectorAll('.header-search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()) {
        const query = encodeURIComponent(input.value.trim());
        if (window.location.pathname.includes('gladiators.html')) {
          // If already on gladiators page, update search input
          const localSearch = document.getElementById('gladiator-search');
          if (localSearch) {
            localSearch.value = decodeURIComponent(query);
            localSearch.dispatchEvent(new Event('input'));
            localSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          // Redirect to gladiators page with search param
          window.location.href = `gladiators.html?search=${query}`;
        }
      }
    });
  });

  // Highlight Current Nav Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
