/* ==========================================================================
   AURA FASHION — shared chrome and helpers
   Injects the announcement bar, header and footer on every page, handles the
   mobile navigation, and exposes the small render helpers the pages use.
   ========================================================================== */

window.AURA = window.AURA || {};

/* ------------------------------- utilities ------------------------------- */

AURA.esc = function (str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

AURA.qs = function (name) {
  return new URLSearchParams(window.location.search).get(name);
};

AURA.icon = function (name) {
  var paths = {
    menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.9" r="0.9" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 8.5h2.5V5.2H14c-2.4 0-4 1.6-4 4v1.8H7.5v3.3H10v6.5h3.4v-6.5h2.4l.4-3.3h-2.8V9.4c0-.6.3-.9.6-.9z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.9" cy="7.1" r="1.1" fill="currentColor" stroke="none"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.6 6.6L12 13l8.4-6.4"/>'
  };
  return '<svg class="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true">' + (paths[name] || '') + '</svg>';
};

/* Monoline "aura" wordmark, recreated from the brand artwork.
   Uses currentColor so one file serves both the light header and dark footer. */
AURA.wordmark = function (cls) {
  return '<svg class="' + (cls || 'wordmark') + '" viewBox="-6 -6 200 112" fill="none" ' +
    'stroke="currentColor" stroke-width="11" role="img" aria-label="AURA">' +
    '<path d="M0,100 L0,20 A20,20 0 0 1 40,20 L40,100"/>' +
    '<path d="M54,0 L54,80 A20,20 0 0 0 94,80 L94,0"/>' +
    '<path d="M108,100 L108,20 A20,20 0 0 1 128,0 L134,0"/>' +
    '<path d="M148,100 L148,20 A20,20 0 0 1 188,20 L188,100"/>' +
    '</svg>';
};

/* --------------------------------- nav ---------------------------------- */

AURA.NAV = [
  { label: 'Home', href: 'index.html', id: 'home' },
  { label: 'New Arrivals', href: 'collection.html?c=new', id: 'new' },
  { label: 'Winter Collection', href: 'collection.html', id: 'collection' },
  { label: 'About Us', href: 'about.html', id: 'about' },
  { label: 'Contact', href: 'about.html#contact', id: 'contact' }
];

/* One nav item is current per page. The collection page serves two of them —
   the whole range and the New Arrivals cut — so the query decides which. */
AURA.activeNavId = function () {
  var page = document.body.getAttribute('data-page');
  if (page === 'product') return 'collection';
  if (page === 'collection') return AURA.qs('c') === 'new' ? 'new' : 'collection';
  if (page === 'about') return window.location.hash === '#contact' ? 'contact' : 'about';
  return 'home';
};

/* Re-mark the header nav after the URL changes without a reload. */
AURA.syncNav = function () {
  var activeId = AURA.activeNavId();
  Array.prototype.forEach.call(document.querySelectorAll('.nav-link'), function (link) {
    var href = link.getAttribute('href') || '';
    var id = (AURA.NAV.filter(function (n) { return n.href === href; })[0] || {}).id;
    var active = id === activeId;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

AURA.renderHeader = function () {
  var activeId = AURA.activeNavId();
  var links = AURA.NAV.map(function (n) {
    var active = n.id === activeId;
    return '<a class="nav-link' + (active ? ' is-active' : '') + '" href="' + n.href + '"' +
      (active ? ' aria-current="page"' : '') + '>' + AURA.esc(n.label) + '</a>';
  }).join('');

  var drawerLinks = AURA.NAV.map(function (n) {
    return '<a class="drawer-link" href="' + n.href + '">' + AURA.esc(n.label) + '</a>';
  }).join('');

  return '' +
    '<div class="announce">' + AURA.esc(AURA.BRAND.announcement) + '</div>' +
    '<header class="site-header" id="siteHeader">' +
      '<div class="wrap header-inner">' +
        '<a class="brand" href="index.html" aria-label="AURA FASHION — home">' +
          AURA.wordmark('wordmark') +
        '</a>' +
        '<nav class="primary-nav" aria-label="Primary">' + links + '</nav>' +
        '<div class="header-end">' +
          '<button class="menu-toggle" id="menuToggle" type="button" ' +
            'aria-expanded="false" aria-controls="mobileNav">' +
            '<span class="sr-only">Menu</span>' +
            '<span class="bars" aria-hidden="true"></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="drawer-scrim" id="drawerScrim" hidden></div>' +
    '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile" hidden>' +
      '<div class="drawer-top">' +
        '<span class="drawer-label">Menu</span>' +
        '<button class="drawer-close" id="drawerClose" type="button">' +
          '<span class="sr-only">Close menu</span>' + AURA.icon('close') +
        '</button>' +
      '</div>' +
      '<div class="drawer-links">' + drawerLinks + '</div>' +
      '<div class="drawer-foot">' +
        '<p class="drawer-slogan">' + AURA.esc(AURA.BRAND.slogan) + '</p>' +
        '<a class="drawer-mail" href="mailto:' + AURA.esc(AURA.BRAND.email) + '">' +
          AURA.icon('mail') + '<span>' + AURA.esc(AURA.BRAND.email) + '</span></a>' +
      '</div>' +
    '</nav>';
};

AURA.renderFooter = function () {
  var year = new Date().getFullYear();

  return '' +
    '<footer class="site-footer">' +
      '<div class="wrap footer-inner">' +
        '<div class="footer-brand">' +
          AURA.wordmark('wordmark wordmark--footer') +
          '<p class="footer-slogan">' + AURA.esc(AURA.BRAND.sloganDisplay) + '</p>' +
        '</div>' +

        '<nav class="footer-nav" aria-label="Footer">' +
          '<a href="index.html">Home</a>' +
          '<a href="collection.html?c=new">New Arrivals</a>' +
          '<a href="collection.html">Winter Collection</a>' +
          '<a href="collection.html?c=hoodies">Premium Hoodies</a>' +
          '<a href="collection.html?c=sweatshirts">Winter Sweatshirts</a>' +
          '<a href="collection.html?c=jackets">Casual Jackets</a>' +
          '<a href="collection.html?c=fullsleeve">Full Sleeve T-Shirts</a>' +
          '<a href="collection.html?c=essentials">Winter Essentials</a>' +
          '<a href="about.html">About Us</a>' +
          '<a href="about.html#contact">Contact</a>' +
        '</nav>' +

        '<div class="footer-social">' +
          '<span class="social-static">' +
            AURA.icon('facebook') + '<span>Facebook</span></span>' +
          '<span class="social-static">' +
            AURA.icon('instagram') + '<span>Instagram</span></span>' +
          '<a href="mailto:' + AURA.esc(AURA.BRAND.email) + '">' +
            AURA.icon('mail') + '<span>Email</span></a>' +
        '</div>' +

        '<div class="footer-meta">' +
          '<p>&copy; ' + year + ' ' + AURA.esc(AURA.BRAND.name) +
            '. All Rights Reserved.</p>' +
          '<p class="footer-note">' + AURA.esc(AURA.BRAND.collection) + ' &mdash; ' +
            AURA.esc(AURA.BRAND.location) + '</p>' +
          '<p class="footer-note">A brand showcase and digital catalogue &mdash; ' +
            'no orders are placed or processed here.</p>' +
        '</div>' +
      '</div>' +
    '</footer>';
};

/* ----------------------------- mobile drawer ---------------------------- */

AURA.wireNav = function () {
  var toggle = document.getElementById('menuToggle');
  var drawer = document.getElementById('mobileNav');
  var scrim = document.getElementById('drawerScrim');
  var close = document.getElementById('drawerClose');
  if (!toggle || !drawer || !scrim || !close) return;

  function open() {
    drawer.hidden = false;
    scrim.hidden = false;
    void drawer.offsetHeight; // flush layout so the transition has a start state
    drawer.classList.add('is-open');
    scrim.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function shut() {
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    window.setTimeout(function () {
      if (!drawer.classList.contains('is-open')) {
        drawer.hidden = true;
        scrim.hidden = true;
      }
    }, 320);
  }

  toggle.addEventListener('click', open);
  close.addEventListener('click', shut);
  scrim.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) shut();
  });
};

/* --------------------------- scroll reveal ------------------------------ */

AURA.wireReveal = function () {
  var nodes = document.querySelectorAll('[data-reveal]');
  if (!nodes.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* IntersectionObserver only delivers callbacks while the page is being
     rendered, so a page that boots in a hidden tab would otherwise leave every
     [data-reveal] node at opacity 0. Reveal immediately in that case. */
  if (reduced || document.hidden || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  nodes.forEach(function (n) { io.observe(n); });
};

/* --------------------------- product card ------------------------------- */

AURA.productCard = function (p, opts) {
  opts = opts || {};
  var swatches = (p.colors || []).slice(0, 4).map(function (c) {
    return '<span class="swatch" style="--sw:' + AURA.esc(c.hex) + '" ' +
      'title="' + AURA.esc(c.name) + '"></span>';
  }).join('');

  return '' +
    '<article class="card' + (opts.compact ? ' card--compact' : '') + '"' +
      (opts.reveal === false ? '' : ' data-reveal') +
      (opts.delay ? ' style="--d:' + opts.delay + 'ms"' : '') + '>' +
      '<a class="card-media" href="product.html?id=' + AURA.esc(p.slug) + '" ' +
        'aria-label="' + AURA.esc(p.name) + ' — view details">' +
        '<img src="' + AURA.esc(p.image) + '" alt="' + AURA.esc(p.name) +
          ', ' + AURA.esc(p.categoryName) + ' by ' + AURA.esc(AURA.BRAND.name) + '" ' +
          'width="900" height="1120" loading="' + (opts.eager ? 'eager' : 'lazy') +
          '" decoding="async">' +
        (p.isNew ? '<span class="card-flag">New</span>' : '') +
        '<span class="card-view">View<em>&rsaquo;</em></span>' +
      '</a>' +
      '<div class="card-body">' +
        '<p class="card-cat">' + AURA.esc(p.categoryName) + '</p>' +
        '<h3 class="card-name">' +
          '<a href="product.html?id=' + AURA.esc(p.slug) + '">' + AURA.esc(p.name) + '</a>' +
        '</h3>' +
        '<p class="card-tag">' + AURA.esc(p.tagline) + '</p>' +
        (swatches ? '<div class="card-swatches" aria-label="Available colours">' +
          swatches + '</div>' : '') +
      '</div>' +
    '</article>';
};

AURA.renderGrid = function (list, mount, opts) {
  if (!mount) return;
  if (!list.length) {
    mount.innerHTML = '<p class="empty">Nothing in this category yet.</p>';
    return;
  }
  mount.innerHTML = list.map(function (p, i) {
    var o = Object.assign({}, opts, { delay: (i % 4) * 80 });
    return AURA.productCard(p, o);
  }).join('');
};

/* ------------------------------ boot order ------------------------------ */

(function () {
  function boot() {
    var page = document.body.getAttribute('data-page');

    document.body.insertAdjacentHTML('afterbegin', AURA.renderHeader());
    document.body.insertAdjacentHTML('beforeend', AURA.renderFooter());

    AURA.wireNav();

    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-stuck', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    document.dispatchEvent(new CustomEvent('aura:chrome-ready', { detail: { page: page } }));
    AURA.wireReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
