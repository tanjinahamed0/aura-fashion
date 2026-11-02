/* Collection page — category filtering driven by the ?c= query parameter. */

(function () {
  var grid = null;
  var listMount = null;
  var countMount = null;
  var current = 'all';

  function valid(id) {
    return AURA.CATEGORIES.some(function (c) { return c.id === id; }) ? id : 'all';
  }

  function list() {
    if (current === 'new') {
      return AURA.PRODUCTS.filter(function (p) { return p.isNew; });
    }
    return current === 'all'
      ? AURA.PRODUCTS
      : AURA.PRODUCTS.filter(function (p) { return p.category === current; });
  }

  function title() {
    var cat = AURA.CATEGORIES.filter(function (c) { return c.id === current; })[0];
    document.title = (current === 'all' ? 'Winter Collection' : cat.label + ' — Winter Collection') +
      ' — AURA FASHION';
  }

  function syncUrl() {
    var url = 'collection.html' + (current === 'all' ? '' : '?c=' + encodeURIComponent(current));
    window.history.replaceState({ c: current }, '', url);
  }

  function paint() {
    var items = list();
    AURA.renderGrid(items, grid);
    countMount.textContent = items.length + (items.length === 1 ? ' piece' : ' pieces');

    Array.prototype.forEach.call(listMount.querySelectorAll('.filter-btn'), function (b) {
      var on = b.getAttribute('data-cat') === current;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    title();
    AURA.syncNav();
    AURA.wireReveal();
  }

  function select(id) {
    current = valid(id);
    syncUrl();
    paint();
  }

  function render() {
    grid = document.getElementById('productGrid');
    listMount = document.getElementById('filterList');
    countMount = document.getElementById('filterCount');
    if (!grid || !listMount || !countMount) return;

    listMount.innerHTML = AURA.CATEGORIES.map(function (c) {
      return '<button class="filter-btn" type="button" data-cat="' + AURA.esc(c.id) + '">' +
        AURA.esc(c.label) + ' <sup>' + AURA.countIn(c.id) + '</sup></button>';
    }).join('');

    listMount.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (btn) select(btn.getAttribute('data-cat'));
    });

    select(AURA.qs('c') || 'all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
