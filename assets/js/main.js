(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -- Mobile nav toggle ------------------------------------ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-links a')];

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navLinks?.classList.remove('open');
    });
  });

  /* -- Scroll reveal ----------------------------------------- */
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* -- Active nav link on scroll ------------------------------ */
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((anchor) => {
          anchor.classList.toggle('active', anchor.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
  }

  /* -- Screenshot reels: arrow buttons (one per case study) ---- */
  document.querySelectorAll('.reel-wrap').forEach((wrap) => {
    const reel = wrap.querySelector('.reel');
    const arrows = wrap.querySelector('.reel-arrows');
    arrows?.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      if (!btn || !reel) return;
      const dir = Number(btn.dataset.dir);
      const card = reel.querySelector('.reel-item');
      const step = card ? card.getBoundingClientRect().width + 16 : 300;
      reel.scrollBy({ left: dir * step, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* -- Lightbox (navigation stays within the same reel group) -- */
  const reelGroups = [...document.querySelectorAll('.reel')].map((reel) => [...reel.querySelectorAll('.reel-item')]);
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('figcaption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxBar = lightbox?.querySelector('.lightbox-bar');
  let activeGroup = [];
  let activeIndex = 0;

  const renderLightbox = () => {
    const item = activeGroup[activeIndex];
    if (!item) return;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.title;
  };

  const openLightbox = (group, index) => {
    if (!lightbox || !group.length) return;
    activeGroup = group;
    activeIndex = (index + group.length) % group.length;
    renderLightbox();
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
    lightboxImage.src = '';
    activeGroup[activeIndex]?.focus();
  };

  const changeLightbox = (direction) => {
    if (!activeGroup.length) return;
    activeIndex = (activeIndex + direction + activeGroup.length) % activeGroup.length;
    renderLightbox();
  };

  reelGroups.forEach((group) => {
    group.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(group, index));
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  lightboxBar?.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    changeLightbox(Number(btn.dataset.dir));
  });

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') changeLightbox(-1);
    if (event.key === 'ArrowRight') changeLightbox(1);
  });
})();
