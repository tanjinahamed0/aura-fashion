/* Home page — renders the category tiles, the editorial looks and the
   new-arrivals row from the catalogue data. */

(function () {
  function render() {
    var catMount = document.getElementById('categoryGrid');
    var newMount = document.getElementById('newGrid');
    var lookMount = document.getElementById('lookGrid');

    if (catMount) {
      catMount.innerHTML = AURA.CATEGORY_CARDS.map(function (c, i) {
        var href = 'collection.html?c=' + encodeURIComponent(c.id);
        return '' +
          '<article class="cat-tile" data-reveal style="--d:' + (i * 90) + 'ms">' +
            '<a class="cat-frame" href="' + href + '" ' +
               'aria-label="Browse ' + AURA.esc(c.label) + '">' +
              '<img src="' + AURA.esc(c.image) + '" alt="' + AURA.esc(c.label) +
                ' from the ' + AURA.esc(AURA.BRAND.collection) + '" ' +
                'width="900" height="1100" loading="lazy" decoding="async">' +
              '<span class="cat-arrow" aria-hidden="true">' + AURA.icon('arrow') + '</span>' +
            '</a>' +
            '<div class="cat-caption">' +
              '<h3 class="cat-name">' + AURA.esc(c.label) + '</h3>' +
              '<p class="cat-copy">' + AURA.esc(c.copy) + '</p>' +
              '<a class="cat-explore" href="' + href + '">Explore' + AURA.icon('arrow') + '</a>' +
            '</div>' +
          '</article>';
      }).join('');
    }

    if (newMount) {
      AURA.renderGrid(AURA.newArrivals().slice(0, 4), newMount);
    }

    if (lookMount) {
      lookMount.innerHTML = AURA.LOOKS.map(function (look, i) {
        var num = (i + 1 < 10 ? '0' : '') + (i + 1);
        return '' +
          '<article class="look-card" data-reveal style="--d:' + (i * 110) + 'ms">' +
            '<div class="look-media">' +
              '<img src="' + AURA.esc(look.image) + '" alt="' + AURA.esc(look.name) +
                ' — a ' + AURA.esc(AURA.BRAND.collection) + ' outfit" ' +
                'width="800" height="1000" loading="lazy" decoding="async">' +
            '</div>' +
            '<p class="look-num">' + num + '</p>' +
            '<h3 class="look-name">' + AURA.esc(look.name) + '</h3>' +
            '<p class="look-copy">' + AURA.esc(look.copy) + '</p>' +
            '<p style="padding-top:14px"><a class="text-link" href="' +
              AURA.esc(look.href) + '">View the pieces' + AURA.icon('arrow') + '</a></p>' +
          '</article>';
      }).join('');
    }

    AURA.wireReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
