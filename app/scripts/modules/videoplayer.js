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
};

DBFBVideoPlayer.prototype.handlePlay = function(event) {
  event.preventDefault();
  this.videoContainer.classList.toggle('show');
  this.video.play();
};

DBFBVideoPlayer.prototype.handleClose = function() {
  event.preventDefault();
  this.video.currentTime = 0;
  this.videoContainer.classList.toggle('show');
  this.video.pause();
};

DBFBVideoPlayer.prototype.handleVideoComplete = function() {
  this.handleClose();
};