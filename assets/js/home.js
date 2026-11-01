/* Home page — renders the category tiles and the featured product row. */

(function () {
  function render() {
    var catMount = document.getElementById('categoryGrid');
    var featMount = document.getElementById('featuredGrid');

    if (catMount) {
      catMount.innerHTML = AURA.CATEGORY_CARDS.map(function (c, i) {
        return '' +
          '<article class="cat-tile" data-reveal style="--d:' + (i * 120) + 'ms">' +
            '<a class="cat-frame" href="collection.html?c=' + AURA.esc(c.id) + '" ' +
               'aria-label="Browse ' + AURA.esc(c.label) + '">' +
              '<img src="' + AURA.esc(c.image) + '" alt="' + AURA.esc(c.label) +
                ' from the AURA FASHION catalogue" width="900" height="1125" ' +
                'loading="lazy" decoding="async">' +
              '<span class="cat-arrow" aria-hidden="true">' + AURA.icon('arrow') + '</span>' +
            '</a>' +
            '<div class="cat-caption">' +
              '<div>' +
                '<h3 class="cat-name">' + AURA.esc(c.label) + '</h3>' +
                '<p class="cat-count">' + AURA.countIn(c.id) + ' pieces</p>' +
              '</div>' +
              '<p class="cat-copy">' + AURA.esc(c.copy) + '</p>' +
            '</div>' +
          '</article>';
      }).join('');
    }

    if (featMount) {
      AURA.renderGrid(AURA.featured(), featMount);
    }

    AURA.wireReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
