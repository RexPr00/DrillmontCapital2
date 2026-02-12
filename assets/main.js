(() => {
  const body = document.body;

  const drawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');

  const openDrawer = () => {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openDrawer);
  menuClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-drawer a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  const langDropdown = document.querySelector('.lang-dropdown');
  const langToggle = document.querySelector('.lang-toggle');
  langToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    langDropdown?.classList.toggle('open');
  });
  document.addEventListener('click', (event) => {
    if (!langDropdown?.contains(event.target)) langDropdown?.classList.remove('open');
  });

  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      const hash = href.includes('#') ? href.slice(href.indexOf('#')) : '';
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      if (href.startsWith('#') || href.endsWith(hash)) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const counters = document.querySelectorAll('.stat-number');
  const animateCounter = (el) => {
    const target = Number(el.dataset.value || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const step = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = `${prefix}${target}${suffix}`;
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => counterObserver.observe(counter));

  const modal = document.getElementById('privacy-modal');
  const openModalButtons = document.querySelectorAll('[data-open-privacy]');
  const closeModalButtons = document.querySelectorAll('[data-close-privacy]');

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('open');
    body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    if (!drawer?.classList.contains('open')) body.style.overflow = '';
  };

  openModalButtons.forEach((btn) => btn.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  }));

  closeModalButtons.forEach((btn) => btn.addEventListener('click', closeModal));
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeDrawer();
      langDropdown?.classList.remove('open');
    }
  });

  document.querySelectorAll('.contact-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const notice = form.querySelector('.notice');
      if (notice) notice.textContent = form.dataset.submitMessage || 'Demo submission disabled.';
    });
  });
})();
