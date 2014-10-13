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