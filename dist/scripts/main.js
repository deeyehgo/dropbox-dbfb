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
    _el.className += ' show-header';
    _handleScroll();
  };

  var _handleTransitionComplete = function() {
    _el.removeEventListener('webkitTransitionEnd', _handleTransitionComplete);
    _el.removeEventListener('transitionend', _handleTransitionComplete);
    _animating = false;
    _el.className += ' remove-transition';
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
  this.playBtn.addEventListener('click', this.handlePlay.bind(this));
  this.closeBtn.addEventListener('click', this.handleClose.bind(this));
  this.video.addEventListener('ended', this.handleVideoComplete.bind(this));

  $(this.videoContainer).css({'opacity': 0});
};

DBFBVideoPlayer.prototype.handlePlay = function(event) {
  event.preventDefault();
  $(this.videoContainer).toggleClass('show');
  this.video.play();

  this.closeBtn.style.right = '-20px';
  var animProps = {
    'right': 30
  }
  $('.close-video').animate(animProps, 350);
};

DBFBVideoPlayer.prototype.handleClose = function() {
  event.preventDefault();
  this.video.currentTime = 0;
  $(this.videoContainer).toggleClass('show');
  this.video.pause();
};

DBFBVideoPlayer.prototype.handleVideoComplete = function() {
  this.handleClose();
};
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
    currentIndex = 0,
    lastIndex = 0;

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
  this.el.querySelectorAll('.pagination-item')[0].className += ' active';

  $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
  
  $('.carousel-image-container').css({
    'left': -(itemWidth)
  });

  $(window).on('resize', function() {
      if($(this).width() < 768) {
        $('.carousel-image-wrapper').css({
          'width': $(window).width()
        });  
      } else {
        $('.carousel-image-wrapper').css({
          'width': 540
        });  
      }
  });
  $(window).trigger('resize');

  function slideLeft() {
    animProps = {'left': parseInt($('.carousel-image-container').css('left')) - itemWidth};
    $('.carousel-image-container').animate(animProps, 350, function() {
      $('.carousel-image-container img:last').after($('.carousel-image-container img:first'));
      $('.carousel-image-container').css({
        'left': -(itemWidth)
      });

      $('.pagination-item').eq(currentIndex).toggleClass('active');
      $('.pagination-item').eq(lastIndex).removeClass('active');

      canAnimate = true;
      lastIndex = currentIndex;
    });
  }

  function slideRight() {
    animProps = {'left': parseInt($('.carousel-image-container').css('left')) + itemWidth};
    $('.carousel-image-container').animate(animProps, 350, function() {
      $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
      $('.carousel-image-container').css({
        'left': -(itemWidth)
      });

      $('.pagination-item').eq(currentIndex).toggleClass('active');
      $('.pagination-item').eq(lastIndex).removeClass('active');

      canAnimate = true;
      lastIndex = currentIndex;
    });
  }

  $('.pagination-item').on({
    'click': function() {
      if(!canAnimate) {
        return false;
      }

      var index = $(this).index();
      currentIndex = index;
      $('.pagination-item').eq(index).addClass('active');
      $('.pagination-item').eq(lastIndex).removeClass('active');
      if(index > lastIndex) {
        animProps = {'left': parseInt($('.carousel-image-container').css('left')) - itemWidth};
        $('.carousel-image-container').animate(animProps, 350, function() {
          $('.carousel-image-container img:last').after($('.carousel-image-container img:first'));
          $('.carousel-image-container').css({
            'left': -(itemWidth)
          });

          $('.pagination-item').eq(currentIndex).addClass('active');

          canAnimate = true;
        });
      } else {
        animProps = {'left': parseInt($('.carousel-image-container').css('left')) + itemWidth};
        $('.carousel-image-container').animate(animProps, 350, function() {
          $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
          $('.carousel-image-container').css({
            'left': -(itemWidth)
          });

          $('.pagination-item').eq(currentIndex).addClass('active');

          canAnimate = true;
        });
      }

      lastIndex = currentIndex;
      return false;
    }
  });

  $('.arrow--prev').on({
    'click': function() {
      if(!canAnimate) {
        return false;
      }

      currentIndex -= 1;
      if(currentIndex < 0) {
        currentIndex = carouselItems - 1;
      }

      slideRight();
      
      canAnimate = false;
      return false;
    }
  });

  $('.arrow--next').on({
    'click': function() {
      if(!canAnimate) {
        return false;
      }

      currentIndex += 1;
      if(currentIndex > carouselItems - 1) {
        currentIndex = 0;
      }

      slideLeft();

      canAnimate = false;
      return false;
    }
  });
};
'use strict';

var retinaize = (function() {

  var retinaize = {
    init: function() {
      window.addEventListener('load', function() {
        var images = document.querySelectorAll('img'),
          imagesLength = images.length,
          retinaImage,
          image;

          for(var i = 0; i < imagesLength; i++) {
            image = images[i];
            retinaImage = image.getAttribute('data-retina');
            if(retinaImage !== null) {
              image.setAttribute('width', image.offsetWidth);
              image.setAttribute('height', image.offsetHeight);
              image.setAttribute('src', retinaImage);
            }
          }
      });
    }
  };

  return retinaize;

}());
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