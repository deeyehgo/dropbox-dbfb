var retinaize = (function() {
  'use strict';

  var retinaize = {
    init: function() {
      window.addEventListener('load', function() {
        var images = document.querySelectorAll('img'),
          imagesLength = images.length,
          retinaImage,
          image,
          i;

          for(i = 0; i < imagesLength; i++) {
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