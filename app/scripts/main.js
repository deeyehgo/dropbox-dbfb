// TODO: retina all images

'use strict';
(function () {
  var carousel,
    hero,
    offsetSpeed;

  offsetSpeed = 0.7;

  carousel = new DBCarousel(document.querySelector('.carousel'));
  hero = document.querySelector('.hero');
  
  function handleScroll() {
    hero.style.backgroundPosition = '0 ' + -(hero.getBoundingClientRect().top * offsetSpeed) + 'px';

  }
  window.addEventListener('scroll', handleScroll);
  // retina
}());
