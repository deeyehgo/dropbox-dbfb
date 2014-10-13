'use strict';

var DBFBHero = (function() {

  var _animating = false,
    _offsetSpeed = 0.75,
    _el = document.querySelector('.hero-bg');
  
  var _init = function() {
    document.addEventListener('DOMContentLoaded', _handleLoad);
    window.addEventListener('scroll', _handleScroll);
  };

  var _handleLoad = function() {
    _animating = true;
    _el.addEventListener('webkitTransitionEnd', _handleTransitionComplete);
    _el.addEventListener('transitionend', _handleTransitionComplete);
    _el.style.opacity = 1;
    _el.classList.add('show-header');
    _handleScroll();
  };

  var _handleTransitionComplete = function() {
    _el.removeEventListener('webkitTransitionEnd', _handleTransitionComplete);
    _el.removeEventListener('transitionend', _handleTransitionComplete);
    _animating = false;
    _el.classList.add('remove-transition');
  };

  var _handleScroll = function() {
    var transformStr = 'translate3d(0, '+((window.pageYOffset * _offsetSpeed)) + 'px, 0)';
    _el.style.webkitTransform = transformStr;
    _el.style.MozTransform = transformStr;
    _el.style.msTransform = transformStr;
    _el.style.OTransform = transformStr;
    _el.style.transform = transformStr;
  };

  _init();

}());
'use strict';

function DBFBVideoPlayer(el) {
  this.el = document.querySelector(el);
  this.playBtn = this.el.querySelector('.play-video');
  this.closeBtn = this.el.querySelector('.close-video');
  this.video = this.el.querySelector('.video-player');
  this.videoContainer = this.el.querySelector('.video-container');

  this.init();
}

DBFBVideoPlayer.prototype.init = function() {
  console.log('oaisjidsaj', this, this.playBtn);
  this.playBtn.addEventListener('click', this.handlePlay.bind(this));
  this.closeBtn.addEventListener('click', this.handleClose.bind(this));
  this.video.addEventListener('ended', this.handleVideoComplete.bind(this));
};

DBFBVideoPlayer.prototype.handlePlay = function(event) {
  event.preventDefault();
  this.videoContainer.classList.toggle('show');
  this.video.play();
};

DBFBVideoPlayer.prototype.handleClose = function() {
  event.preventDefault();
  this.video.currentTime = 0;
  this.videoContainer.classList.toggle('show');
  this.video.pause();
};

DBFBVideoPlayer.prototype.handleVideoComplete = function() {
  this.handleClose();
};
'use strict';
function DBPagination() {
  // this.pageItems = 
}

DBPagination.prototype.init = function() {
  // build all items - insert in to dom
};
// TODO: pagination navigation

'use strict';
/**
 * [DBCarousel]
 */
function DBCarousel(el) {
  this.config = {};
  this.el = document.querySelector(el);
  this.index = 0;

  this.init();
}

DBCarousel.prototype.init = function() {
  var arrowsHTML,
    paginationHTML,
    itemWidth = $('.carousel-image-container img').outerWidth(),
    carouselItems = this.el.querySelectorAll('.carousel-image-container img').length,
    wrapper = $('.carousel-image-wrapper'),
    animProps = {},
    canAnimate = true,
    lastIndex;

  arrowsHTML = '<div class="arrow-container">' +
                  '<a href="#" class="button arrow arrow--prev"></a>' +
                  '<a href="#" class="button arrow arrow--next"></a>' +
                '</div>';

  paginationHTML = '<div class="pagination-container">';

  for (var i = 0; i < carouselItems; i++) {
    paginationHTML += '<a href="#" class="pagination-item pagination-item-' + i + '"></a>';
  }

  paginationHTML += '</div>';

  this.el.insertAdjacentHTML('afterbegin', arrowsHTML);
  this.el.insertAdjacentHTML('beforeend', paginationHTML);
  this.el.querySelectorAll('.pagination-item')[0].classList.add('active');

  $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
  
  $('.carousel-image-container').css({
    'left': -(itemWidth)
  });

  $('.pagination-item').on({
    'click': function() {
      var index = $(this).index();
      $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
      if(index > lastIndex) {

      } else {

      }

      lastIndex = index;
      return false;
    }
  });

  $('.arrow--prev').on({
    'click': function() {
      if(!canAnimate) {
        return false;
      }

      animProps = {'left': parseInt($('.carousel-image-container').css('left')) + itemWidth};
      $('.carousel-image-container').animate(animProps, 350, function() {
        $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
        $('.carousel-image-container').css({
          'left': -(itemWidth)
        });

        canAnimate = true;
      });

      lastIndex = $('.carousel-image-container img:first').index();
      console.log(lastIndex);

      canAnimate = false;
      return false;
    }
  });

  $('.arrow--next').on({
    'click': function() {
      if(!canAnimate) {
        return false;
      }

      animProps = {'left': parseInt($('.carousel-image-container').css('left')) - itemWidth};
      $('.carousel-image-container').animate(animProps, 350, function() {
        $('.carousel-image-container img:last').after($('.carousel-image-container img:first'));
        $('.carousel-image-container').css({
          'left': -(itemWidth)
        });

        canAnimate = true;
      });

      lastIndex = $('.carousel-image-container img:last').index();

      canAnimate = false;
      return false;
    }
  });
};

DBCarousel.prototype.scroll = function() {

};

/**
 * Next slide
 */
DBCarousel.prototype.next = function() {
  this.index++;
  if(this.index > this.totalItems) {
    this.index = 0;
  }

  // animate slide from RtL (even when going from index[index.length] to index[0])
};

/**
 * Prev slide
 */
DBCarousel.prototype.prev = function() {
  this.index--;
  if(this.index < 0) {
    this.index = this.totalItems;
  }

  // animate slide from LtR (even when going from index[index.length] to index[0])
};


// TODO: retina all images
// TODO: move article module to separate class

'use strict';
(function () {
  var carousel = new DBCarousel('.carousel'),
    videoPlayer = new DBFBVideoPlayer('.video-wrapper');

  // move to separate class
  var articleItems = document.querySelectorAll('.article-img'),
    articleItemsTotal = articleItems.length;

  function handleScroll() {
    if(isInViewport(document.querySelector('.article-img'))) {
      for(var i = 0; i < articleItemsTotal; i++) {
        setTimeout(showArticleItem, 200 * i, [i]);
      }

      window.removeEventListener('scroll', handleScroll);
    }
  }

  function showArticleItem(i) {
    articleItems[i].classList.add('show');
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect(),
      html = document.documentElement;

    return (
      rect.top <= (window.innerHeight || html.clientHeight) &&
      rect.bottom <= (window.innerHeight || html.clientHeight)
    );
  }

  document.documentElement.classList.toggle('no-js');
  window.addEventListener('scroll', handleScroll);
  setTimeout(handleScroll, 10);
  
  // retina
}());