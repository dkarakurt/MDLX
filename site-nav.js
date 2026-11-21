// Maison De Loup Atelier — shared mobile navigation drawer.
// Adds a menu button and a slide-in drawer built from the page's .main-nav links,
// so every page (home, legal, contact, product) gets a working menu below 1024px.
(function () {
  function init() {
    var header = document.querySelector('.site-header');
    var nav = header && header.querySelector('.main-nav');
    if (!header || !nav || header.querySelector('.mobile-menu-btn')) return;

    var isEn = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mobile-menu-btn';
    btn.setAttribute('aria-label', isEn ? 'Open menu' : 'Menüyü aç');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mobileDrawer');
    btn.innerHTML = '<span></span><span></span>';
    header.insertBefore(btn, header.firstChild);

    var overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';

    var drawer = document.createElement('nav');
    drawer.className = 'mobile-drawer';
    drawer.id = 'mobileDrawer';
    drawer.setAttribute('aria-label', isEn ? 'Mobile menu' : 'Mobil Menü');
    drawer.setAttribute('aria-hidden', 'true');

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'mobile-drawer-close';
    close.setAttribute('aria-label', isEn ? 'Close menu' : 'Menüyü kapat');
    close.innerHTML = '&times;';
    drawer.appendChild(close);

    var list = document.createElement('div');
    list.className = 'mobile-drawer-links';
    drawer.appendChild(list);

    function build() {
      list.innerHTML = '';
      nav.querySelectorAll('a').forEach(function (a) {
        var link = document.createElement('a');
        link.href = a.getAttribute('href');
        link.textContent = a.textContent.trim();
        link.addEventListener('click', function (e) {
          setOpen(false);
          // Re-use the original link's behaviour (filters, modals, etc.)
          if (a.onclick || a.hasAttribute('data-filter')) { e.preventDefault(); a.click(); }
        });
        list.appendChild(link);
      });
    }

    function setOpen(open) {
      if (open) build();
      document.body.classList.toggle('mobile-nav-open', open);
      btn.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      if (open) close.focus(); else if (document.activeElement && drawer.contains(document.activeElement)) btn.focus();
    }

    btn.addEventListener('click', function () { setOpen(!document.body.classList.contains('mobile-nav-open')); });
    close.addEventListener('click', function () { setOpen(false); });
    overlay.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1024) setOpen(false); });

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Compact sticky header once the page scrolls (same threshold as app.js)
    // Scroll-linked header: progress 0 → 1 over the first RANGE pixels,
    // eased and smoothed per frame so the motion never snaps.
    var RANGE = 200, target = 0, current = 0, raf = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var paint = function () {
      current += (target - current) * (reduce ? 1 : 0.18);
      if (Math.abs(target - current) < 0.002) current = target;
      header.style.setProperty('--hp', current.toFixed(4));
      header.classList.toggle('scrolled', current > 0.2);
      raf = current === target ? 0 : requestAnimationFrame(paint);
    };
    var onScroll = function () {
      target = ease(Math.min(Math.max(window.scrollY / RANGE, 0), 1));
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
