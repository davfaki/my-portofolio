/**
 * AHMAD DAVFA MAULANA — BESPOKE PORTFOLIO SCRIPTS
 * Warm, authentic tactile interactions (anti AI-slop).
 * Zero innerHTML vulnerabilities. Consistent null safety.
 * Real-time Live Clock & Dark/Light Mode Theme Switcher.
 */

(() => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set Current Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     1. WARM TACTILE TOAST NOTIFICATION SYSTEM
     ========================================================= */
  const toastContainer = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();

  const createSvgIcon = (type) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.classList.add('w-4', 'h-4', 'shrink-0');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');

    if (type === 'success') {
      svg.classList.add('text-[#BC5434]');
      path.setAttribute('d', 'M5 13l4 4L19 7');
    } else if (type === 'download') {
      svg.classList.add('text-[#BC5434]');
      path.setAttribute('d', 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4');
    } else {
      svg.classList.add('text-[#8C7A70]');
      path.setAttribute('d', 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');
    }

    svg.appendChild(path);
    return svg;
  };

  const showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = 'toast-item flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium';

    const iconEl = createSvgIcon(type);

    const msgSpan = document.createElement('span');
    msgSpan.className = 'text-[#28201C] dark:text-[#FAF5EF]';
    msgSpan.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ml-auto text-[#A19185] hover:text-[#28201C] dark:hover:text-[#FAF5EF] p-1 rounded-md transition-colors focus:outline-none';
    closeBtn.setAttribute('aria-label', 'Tutup pemberitahuan');

    const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeSvg.setAttribute('viewBox', '0 0 24 24');
    closeSvg.setAttribute('fill', 'none');
    closeSvg.setAttribute('stroke', 'currentColor');
    closeSvg.classList.add('w-3.5', 'h-3.5');
    const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    closePath.setAttribute('stroke-linecap', 'round');
    closePath.setAttribute('stroke-linejoin', 'round');
    closePath.setAttribute('stroke-width', '2');
    closePath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    closeSvg.appendChild(closePath);
    closeBtn.appendChild(closeSvg);

    closeBtn.addEventListener('click', () => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 250);
    });

    toast.append(iconEl, msgSpan, closeBtn);
    toastContainer?.appendChild(toast);

    setTimeout(() => {
      if (toast.isConnected) {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  };

  window.portfolioToast = showToast;

  /* =========================================================
     2. TACTILE CLICK RIPPLE ON BUTTONS
     ========================================================= */
  document.addEventListener('click', (e) => {
    if (!e || !e.target) return;
    const buttonTarget = e.target.closest('.tactile-btn');
    if (!buttonTarget) return;

    const circle = document.createElement('span');
    const diameter = Math.max(buttonTarget.clientWidth, buttonTarget.clientHeight);
    const radius = diameter / 2;
    const rect = buttonTarget.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-circle');

    const existing = buttonTarget.querySelector('.ripple-circle');
    if (existing) existing.remove();

    buttonTarget.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });

  /* =========================================================
     3. ONE-CLICK COPY TO CLIPBOARD BUTTONS
     ========================================================= */
  document.querySelectorAll('[data-copy]')?.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', async (e) => {
      if (e) e.preventDefault();
      const textToCopy = btn.dataset.copy || '';
      const label = btn.dataset.copyLabel || 'Teks';

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`${label} berhasil disalin ke clipboard`, 'success');

        const originalNodes = Array.from(btn.childNodes).map((n) => n.cloneNode(true));

        const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkSvg.setAttribute('viewBox', '0 0 24 24');
        checkSvg.setAttribute('fill', 'none');
        checkSvg.setAttribute('stroke', 'currentColor');
        checkSvg.classList.add('w-3.5', 'h-3.5', 'text-[#BC5434]', 'inline');
        const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        checkPath.setAttribute('stroke-linecap', 'round');
        checkPath.setAttribute('stroke-linejoin', 'round');
        checkPath.setAttribute('stroke-width', '2');
        checkPath.setAttribute('d', 'M5 13l4 4L19 7');
        checkSvg.appendChild(checkPath);

        const statusSpan = document.createElement('span');
        statusSpan.className = 'text-[#BC5434] text-xs font-semibold ml-1';
        statusSpan.textContent = 'Tersalin!';

        btn.classList.add('border-[#BC5434]/50', 'bg-[#FBF4EF]', 'dark:bg-[#28211D]');
        btn.replaceChildren(checkSvg, statusSpan);

        setTimeout(() => {
          btn.classList.remove('border-[#BC5434]/50', 'bg-[#FBF4EF]', 'dark:bg-[#28211D]');
          btn.replaceChildren(...originalNodes);
        }, 2000);
      } catch (err) {
        showToast(`Gagal menyalin: ${textToCopy}`, 'info');
      }
    });
  });

  /* =========================================================
     4. DOWNLOAD CV & CONTACT BUTTON ACTION NOTIFICATIONS
     ========================================================= */
  const cvBtn = document.getElementById('cv-download-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      showToast('Mengunduh berkas Curriculum Vitae (PDF)...', 'download', 3500);
    });
  }

  document.querySelectorAll('a[href^="mailto:"]')?.forEach((link) => {
    if (!link) return;
    link.addEventListener('click', () => {
      showToast('Membuka aplikasi surel untuk menghubungi Davfa...', 'info');
    });
  });

  document.querySelectorAll('a[href*="wa.me"]')?.forEach((link) => {
    if (!link) return;
    link.addEventListener('click', () => {
      showToast('Mengarahkan ke percakapan WhatsApp Davfa...', 'success');
    });
  });

  /* =========================================================
     5. PROJECT CATEGORY FILTERING TABS
     ========================================================= */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');

  filterBtns?.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      filterBtns?.forEach((b) => {
        if (!b) return;
        b.classList.remove('bg-[#28201C]', 'dark:bg-[#FAF5EF]', 'bg-[#241C18]', 'dark:bg-[#F2EBE3]', 'text-[#FAF6F0]', 'dark:text-[#15110F]', 'dark:text-[#161412]', 'shadow-sm');
        b.classList.add('bg-transparent', 'text-[#5C4D44]', 'dark:text-[#B8AAA0]', 'hover:text-[#241C18]', 'dark:hover:text-[#F2EBE3]');
      });

      btn.classList.remove('bg-transparent', 'text-[#5C4D44]', 'text-[#63534B]', 'dark:text-[#B8AAA0]', 'dark:text-[#C8B9AF]', 'hover:text-[#241C18]', 'dark:hover:text-[#F2EBE3]');
      btn.classList.add('bg-[#241C18]', 'dark:bg-[#F2EBE3]', 'text-[#FAF6F0]', 'dark:text-[#161412]', 'shadow-sm');

      const filterValue = btn.dataset.filter || 'all';
      let visibleCount = 0;

      projectCards?.forEach((card) => {
        if (!card) return;
        const cat = card.dataset.category || '';
        if (filterValue === 'all' || cat.includes(filterValue)) {
          card.style.display = 'block';
          card.classList.add('reveal-visible');
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const label = btn.textContent ? btn.textContent.trim() : '';
      showToast(`Menampilkan ${visibleCount} studi kasus: ${label}`, 'info', 2200);
    });
  });

  /* =========================================================
     6. MOBILE NAVIGATION TOGGLE
     ========================================================= */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-links a')];

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks?.classList.toggle('hidden');
      navLinks?.classList.toggle('flex');
    });
  }

  navAnchors?.forEach((anchor) => {
    if (!anchor) return;
    anchor.addEventListener('click', () => {
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
      if (window.innerWidth < 768) {
        navLinks?.classList.add('hidden');
        navLinks?.classList.remove('flex');
      }
    });
  });

  /* =========================================================
     7. SCROLL REVEAL & ACTIVE NAVIGATION
     ========================================================= */
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealElements?.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements?.forEach((el) => el.classList.add('reveal-visible'));
  }

  // Active section spy
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors?.forEach((anchor) => {
          if (!anchor) return;
          const isActive = anchor.getAttribute('href') === `#${id}`;
          anchor.classList.toggle('text-[#BC5434]', isActive);
          anchor.classList.toggle('font-bold', isActive);
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    document.querySelectorAll('main section[id]')?.forEach((section) => sectionObserver.observe(section));
  }

  /* =========================================================
     8. SCREENSHOT REEL HORIZONTAL SCROLLING
     ========================================================= */
  document.querySelectorAll('.reel-wrap').forEach((wrap) => {
    if (!wrap) return;
    const reel = wrap.querySelector('.reel-container');
    const arrows = wrap.querySelector('.reel-arrows');

    if (arrows && reel) {
      arrows.addEventListener('click', (event) => {
        if (!event || !event.target || !(event.target instanceof Element)) return;
        const arrowButton = event.target.closest('button');
        if (!arrowButton) return;
        const dir = Number(arrowButton.dataset.dir || 0);
        const card = reel.querySelector('.reel-card');
        const step = card ? card.getBoundingClientRect().width + 20 : 320;
        reel.scrollBy({ left: dir * step, behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    }
  });

  /* =========================================================
     9. MUSEUM-STYLE LIGHTBOX PREVIEW
     ========================================================= */
  const reelCards = [...document.querySelectorAll('.reel-card')];
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('figcaption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxBar = lightbox?.querySelector('.lightbox-bar');
  let activeIndex = 0;

  const renderLightbox = () => {
    const item = reelCards[activeIndex];
    if (!item || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = item.dataset.full || '';
    lightboxImage.alt = item.querySelector('img')?.alt || 'Tangkapan Layar Proyek';

    const frameSpan = document.createElement('span');
    frameSpan.className = 'text-[#D48B70] font-mono font-medium mr-2';
    frameSpan.textContent = `Frame ${(activeIndex + 1).toString().padStart(2, '0')} / ${reelCards.length.toString().padStart(2, '0')}`;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'text-[#FAF6F0] font-medium';
    titleSpan.textContent = item.dataset.title || '';

    lightboxCaption.replaceChildren(frameSpan, titleSpan);
  };

  const openLightbox = (index) => {
    if (!lightbox || !reelCards.length) return;
    activeIndex = (index + reelCards.length) % reelCards.length;
    renderLightbox();
    lightbox.hidden = false;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    if (lightboxClose) lightboxClose.focus();
    showToast(`Pratinjau gambar: ${reelCards[activeIndex].dataset.title || ''}`, 'info', 1800);
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    if (lightboxImage) lightboxImage.src = '';
  };

  const changeLightbox = (dir) => {
    if (!reelCards.length) return;
    activeIndex = (activeIndex + dir + reelCards.length) % reelCards.length;
    renderLightbox();
  };

  reelCards.forEach((item, index) => {
    if (!item) return;
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxBar) {
    lightboxBar.addEventListener('click', (event) => {
      if (!event || !event.target || !(event.target instanceof Element)) return;
      const barButton = event.target.closest('button');
      if (!barButton) return;
      changeLightbox(Number(barButton.dataset.dir || 0));
    });
  }

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') changeLightbox(-1);
    if (event.key === 'ArrowRight') changeLightbox(1);
  });

  /* =========================================================
     10. BACK TO TOP BUTTON WITH CIRCULAR PROGRESS
     ========================================================= */
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('scroll-progress-indicator');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));

    if (progressCircle) {
      const circumference = 2 * Math.PI * 18;
      const offset = circumference - (progress / 100) * circumference;
      progressCircle.style.strokeDashoffset = `${offset}`;
    }

    if (scrollTop > 350) {
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn?.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn?.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Kembali ke puncak halaman', 'info', 1600);
  });

  /* =========================================================
     11. REAL-TIME LIVE CLOCK IN NAVBAR (Mobile Friendly)
     ========================================================= */
  const clockElement = document.getElementById('navbar-live-clock');

  const updateNavbarClock = () => {
    if (!clockElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // On mobile screens (< 640px) show compact HH:mm WIB, on desktop show full HH:mm:ss WIB
    if (window.innerWidth < 640) {
      clockElement.textContent = `${hours}:${minutes} WIB`;
    } else {
      clockElement.textContent = `${hours}:${minutes}:${seconds} WIB`;
    }
  };

  updateNavbarClock();
  setInterval(updateNavbarClock, 1000);
  window.addEventListener('resize', updateNavbarClock, { passive: true });

  /* =========================================================
     12. DARK / LIGHT MODE THEME SWITCHER
     ========================================================= */
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const htmlRoot = document.documentElement;

  const applyTheme = (isDark, notify = false) => {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (isDark) {
      htmlRoot.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (metaTheme) metaTheme.setAttribute('content', '#161412');
      if (themeLabel) themeLabel.textContent = 'Gelap';
      if (notify) showToast('Mode Gelap diaktifkan', 'info', 1800);
    } else {
      htmlRoot.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (metaTheme) metaTheme.setAttribute('content', '#FAF6F0');
      if (themeLabel) themeLabel.textContent = 'Terang';
      if (notify) showToast('Mode Terang diaktifkan', 'info', 1800);
    }
  };

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
    applyTheme(true, false);
  } else {
    applyTheme(false, false);
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = htmlRoot.classList.contains('dark');
    applyTheme(!isDark, true);
  });

})();
