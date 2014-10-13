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

