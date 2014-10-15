// TODO: move article module to separate class

'use strict';

(function () {
  var carousel = new DBCarousel('.carousel'),
    videoPlayer = new DBFBVideoPlayer('.video-wrapper'),
    startY = window.pageYOffset;
    retinaize.init();

  var articleItems = $('.article-img'),
    articleItemsTotal = articleItems.length;

  function handleScroll() {
    if(isInViewport(articleItems[0])) {
      if(startY <= 0 || Math.abs(window.pageYOffset - startY) > 200) {
        prepareArticleAnimation();
      }
    }
  }

  function prepareArticleAnimation() {
    for(var i = 0; i < articleItemsTotal; i++) {
      setTimeout(showArticleItem, 200 * i, [i]);
    }
  }

  function showArticleItem(i) {
    $(articleItems[i]).addClass('show');
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect(),
      html = document.documentElement;

    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight)
    );
  }

  document.documentElement.className = '';

  setTimeout(function() {
    window.addEventListener('scroll', handleScroll);
    if(window.pageYOffset <= 0) {
      handleScroll();
    }
  }, 500);
}());