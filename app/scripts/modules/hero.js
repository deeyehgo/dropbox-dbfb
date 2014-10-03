function DBFBHero(el) {
  this.el = document.querySelector(el);
  this.offsetSpeed = 0.75;
  this.init();
}

DBFBHero.prototype.init = function() {
  console.log(this.el.style);
  var me = this;
  // pass 'this' not window context
  console.log(me);
  // this.addEventListener('load', me.handleLoad);
  window.addEventListener('scroll', me.handleScroll);
};

DBFBHero.prototype.handleScroll = function(event) {
  console.log('scrolling');
  console.log(this);
  this.el.style.backgroundPosition = '0 ' + -(this.el.getBoundingClientRect().top * this.offsetSpeed) + 'px';
};

DBFBHero.prototype.handleLoad = function() {
  console.log('loaded hero');

  // fade in bg
}