var controllers = namespace('demona.portfolio.controllers');

controllers.MainController = function () {
  var banner = new views.ProfileBanner({
    el: $('.profile-banner')
  });
}

$.extend (controllers.MainController.prototype, {
  addListeners: function () {
    $.$window.on('resize', _.debounce(_.bind(this.onResize, this), 500));
  },

  onResize: function (e) {
    $.$body.trigger('window:resize', $.$window.width(), $.$window.height());
  }
});