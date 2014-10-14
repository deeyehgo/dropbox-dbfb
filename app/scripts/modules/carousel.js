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
  this.el.querySelectorAll('.pagination-item')[0].classList.add('active');

  $('.carousel-image-container img:first').before($('.carousel-image-container img:last'));
  
  $('.carousel-image-container').css({
    'left': -(itemWidth)
  });

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