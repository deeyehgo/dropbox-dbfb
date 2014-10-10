// TODO: retina all images
// TODO: move article module to separate class

'use strict';
(function () {
  var carousel;

  document.documentElement.classList.toggle('no-js');
  carousel = new DBCarousel('.carousel');
  window.addEventListener('scroll', handleScroll);
  setTimeout(handleScroll, 10);

  // move to separate class
  var articleItems = document.querySelectorAll('.article-img'),
    articleItemsTotal = articleItems.length,
    triggerY = document.querySelector('.section--why-dbfb').getBoundingClientRect().top - 200;

  function handleScroll() {
    if(isInViewport(document.querySelector('.article-img'))) {
      for(var i = 0; i < articleItemsTotal; i++) {
        setTimeout(showArticleItem, 200 * i, [i]);
      }

      window.removeEventListener('scroll', handleScroll);
    }
  }

  function showArticleItem(i) {
    articleItems[i].classList.add('show')
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect(),
      html = document.documentElement;

    // console.log(rect.top, rect.bottom, window.innerHeight, html.clientHeight);

    return (
      rect.top <= (window.innerHeight || html.clientHeight) &&
      rect.bottom <= (window.innerHeight || html.clientHeight)
    );
  }
  
  // retina
}());