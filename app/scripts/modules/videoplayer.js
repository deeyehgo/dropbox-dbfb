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