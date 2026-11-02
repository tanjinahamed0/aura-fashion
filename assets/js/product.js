/* Product details page — renders from ?id=<slug>.
   Informational only: colours, sizes and cloth are listed for reference.
   Nothing on this page takes an order. */

(function () {
  /* Three framings of the same photograph, so the gallery shows real detail
     without inventing angles we have not shot. */
  var VIEWS = [
    { label: 'Full view', scale: 1, origin: '50% 18%' },
    { label: 'Cloth detail', scale: 2.35, origin: '50% 34%' },
    { label: 'Hem & seam', scale: 2.35, origin: '50% 86%' }
  ];

  function viewStyle(v) {
    return v.scale === 1 ? '' :
      ' style="transform:scale(' + v.scale + ');transform-origin:' + v.origin + '"';
  }

  function galleryHtml(p) {
    var src = AURA.esc(p.image);
    var idx = AURA.PRODUCTS.indexOf(p) + 1;
    var badge = 'Piece ' + (idx < 10 ? '0' : '') + idx + ' / ' + AURA.PRODUCTS.length;

    var thumbs = VIEWS.map(function (v, i) {
      return '<button class="thumb' + (i === 0 ? ' is-active' : '') + '" type="button" ' +
        'data-view="' + i + '" aria-label="' + AURA.esc(v.label) + '" aria-pressed="' +
        (i === 0) + '">' +
        '<img src="' + src + '" alt="" width="900" height="1120" loading="lazy" ' +
        'decoding="async"' + viewStyle(v) + '>' +
        '</button>';
    }).join('');

    return '' +
      '<div class="pdp-gallery">' +
        '<div class="pdp-stage">' +
          '<span class="pdp-tag-badge">' + AURA.esc(badge) + '</span>' +
          '<img id="pdpMain" src="' + src + '" alt="' + AURA.esc(p.name) +
            ' — ' + AURA.esc(p.categoryName) + ' by ' + AURA.esc(AURA.BRAND.name) + '" ' +
            'width="900" height="1120" fetchpriority="high" decoding="async">' +
        '</div>' +
        '<div class="pdp-thumbs" role="group" aria-label="Product views">' + thumbs + '</div>' +
      '</div>';
  }

  function specHtml(p) {
    var colors = (p.colors || []).map(function (c) {
      return '<span class="color-opt"><span class="color-dot" style="--sw:' +
        AURA.esc(c.hex) + '"></span>' + AURA.esc(c.name) + '</span>';
    }).join('');

    var sizes = (p.sizes || []).map(function (s) {
      return '<span class="chip"><b>' + AURA.esc(s.label) + '</b>' +
        (s.note ? '<i>' + AURA.esc(s.note) + '</i>' : '') + '</span>';
    }).join('');

    return '' +
      '<div class="spec">' +
        '<p class="spec-label">Available colours <span>Shown for reference</span></p>' +
        '<div class="color-row">' + colors + '</div>' +
      '</div>' +
      '<div class="spec">' +
        '<p class="spec-label">Size run <span>' + (p.sizes || []).length + ' options</span></p>' +
        '<div class="size-row">' + sizes + '</div>' +
      '</div>' +
      '<div class="spec">' +
        '<p class="spec-label">At a glance</p>' +
        '<dl class="facts">' +
          '<div class="fact"><dt>Fabric</dt><dd>' + AURA.esc(p.fabric) + '</dd></div>' +
          '<div class="fact"><dt>Weight</dt><dd>' + AURA.esc(p.weight) + '</dd></div>' +
          '<div class="fact"><dt>Fit</dt><dd>' + AURA.esc(p.fit) + '</dd></div>' +
          '<div class="fact"><dt>Category</dt><dd>' + AURA.esc(p.categoryName) + '</dd></div>' +
          '<div class="fact"><dt>Reference</dt><dd>' + AURA.esc(p.slug.toUpperCase()) + '</dd></div>' +
        '</dl>' +
      '</div>';
  }

  function list(items) {
    return '<ul>' + items.map(function (t) {
      return '<li>' + AURA.esc(t) + '</li>';
    }).join('') + '</ul>';
  }

  function accordionHtml(p) {
    var panels = [
      { t: 'Product details', body: list(p.details) },
      { t: 'Fabric', body: '<p>' + AURA.esc(p.fabric) + ' &mdash; ' + AURA.esc(p.weight) +
        '. ' + AURA.esc(p.fit) + '.</p>' },
      { t: 'Looking after it', body: list(p.care) },
      { t: 'Fit &amp; sizing', body: '<p>' + AURA.esc(p.fit) + '. The size run above covers ' +
        p.sizes.map(function (s) { return s.label; }).join(', ') +
        '. Because this is a showcase, measurements are given as a guide to the cut rather than an ordering chart.</p>' }
    ];

    return '<div class="acc">' + panels.map(function (row, i) {
      var pid = 'acc-' + i;
      return '<div class="acc-item' + (i === 0 ? ' is-open' : '') + '">' +
        '<button class="acc-btn" type="button" aria-expanded="' + (i === 0) + '" ' +
          'aria-controls="' + pid + '"><span>' + row.t + '</span>' + AURA.icon('chevron') + '</button>' +
        '<div class="acc-panel" id="' + pid + '" role="region"><div><div class="acc-inner">' +
          row.body + '</div></div></div>' +
      '</div>';
    }).join('') + '</div>';
  }

  function infoHtml(p) {
    return '' +
      '<div class="pdp-info">' +
        '<p class="pdp-cat">' + AURA.esc(p.categoryName) + '</p>' +
        '<h1 class="pdp-name">' + AURA.esc(p.name) + '</h1>' +
        '<p class="pdp-tag">' + AURA.esc(p.tagline) + '</p>' +
        '<p class="pdp-desc">' + AURA.esc(p.description) + '</p>' +
        specHtml(p) +
        '<p class="showcase-note">' + AURA.icon('info') +
          '<span>AURA FASHION is a brand showcase and digital catalogue. Colours, sizes and ' +
          'fabric are listed so you can read the piece properly &mdash; nothing on this ' +
          'page can be bought or ordered.</span></p>' +
        accordionHtml(p) +
        '<div style="padding-top:28px">' +
          '<a class="text-link" href="collection.html?c=' + AURA.esc(p.category) + '">' +
            'All ' + AURA.esc(p.categoryName) + AURA.icon('arrow') + '</a>' +
        '</div>' +
      '</div>';
  }

  function notFound() {
    document.getElementById('crumbs').innerHTML =
      '<a href="index.html">Home</a><span class="sep">/</span>' +
      '<a href="collection.html">Winter Collection</a><span class="sep">/</span>' +
      '<span class="current">Not found</span>';

    document.getElementById('pdpMount').innerHTML =
      '<div class="notfound">' +
        '<p class="eyebrow">Error 404</p>' +
        '<h1 class="page-title">Piece not found</h1>' +
        '<p class="page-sub">That reference is not in the current catalogue. ' +
        'It may have been renamed or retired.</p>' +
        '<div class="notfound-actions">' +
          '<a class="btn" href="collection.html">Browse the collection</a>' +
        '</div>' +
      '</div>';

    var rel = document.getElementById('relatedSection');
    if (rel) rel.remove();
  }

  function wire(p) {
    var main = document.getElementById('pdpMain');
    var thumbs = document.querySelectorAll('.thumb');

    Array.prototype.forEach.call(thumbs, function (btn) {
      btn.addEventListener('click', function () {
        var v = VIEWS[Number(btn.getAttribute('data-view'))];
        main.style.transform = v.scale === 1 ? '' : 'scale(' + v.scale + ')';
        main.style.transformOrigin = v.origin;
        Array.prototype.forEach.call(thumbs, function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('.acc-btn'), function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.acc-item');
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  function render() {
    var slug = AURA.qs('id');
    var p = slug && AURA.get(slug);

    if (!p) { notFound(); return; }

    document.title = p.name + ' — ' + p.categoryName + ' — AURA FASHION';

    document.getElementById('crumbs').innerHTML =
      '<a href="index.html">Home</a><span class="sep">/</span>' +
      '<a href="collection.html">Winter Collection</a><span class="sep">/</span>' +
      '<a href="collection.html?c=' + AURA.esc(p.category) + '">' +
        AURA.esc(p.categoryName) + '</a><span class="sep">/</span>' +
      '<span class="current">' + AURA.esc(p.name) + '</span>';

    var mount = document.getElementById('pdpMount');
    mount.className = 'wrap pdp';
    mount.innerHTML = galleryHtml(p) + infoHtml(p);

    var related = (p.related || []).map(AURA.get).filter(Boolean);
    AURA.renderGrid(related, document.getElementById('relatedGrid'));

    wire(p);
    AURA.wireReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
