'use strict';
/**
 * [DBCarousel]
 */
function DBCarousel(el) {
  this.config = {};
  this.el = document.querySelector(el);
  this.index = 0;
  this.totalItems = 4;
  this.prev = this.el.querySelector('.arrow--prev') || '';
  this.next = this.el.querySelector('.arrow--next') || '';
  this.pagination = this.el.querySelector('.pagination-container') || '';
}

DBCarousel.prototype.init = function() {
  var pagination = new DBPagination(document.querySelector('.pagination'));
  // pagination item should build out based on num img in carousel.
  if(this.config.paginationItems.length > 0) {
    pagination.init();
  }
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

