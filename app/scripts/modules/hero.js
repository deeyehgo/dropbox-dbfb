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
    _el.addEventListener('transitionend', _handleTransitionComplete);
    _el.style.opacity = 1;
    _el.style.transform = 'translate(0, 0)';
    _el.style.transition = 'opacity 0.5s ease, transform 1s ease';
  };

  var _handleTransitionComplete = function() {
    _el.removeEventListener('transitionend', _handleTransitionComplete);
    _animating = false;
    _el.style.transition = 0;
  };

  var _handleScroll = function() {
    _el.style.backgroundPosition = '0 ' + Math.round(-(_el.getBoundingClientRect().top * _offsetSpeed)) + 'px';
  }

  _init();

  // return DBFBHero;

}());