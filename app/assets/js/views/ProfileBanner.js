var views = namespace('demona.portfolio.views');


views.ProfileBanner = Backbone.View.extend( {

  initialize: function () {
    this.render();
    this.addListeners();
  },

  addListeners: function () {
    $.$body.on('window:resize', _.bind(this.resize, this));
  },

  render: function () {
    this.resize($.$window.width(), $.$window.height());
  },

  resize: function (w, h) {
    this.$el.css({
      width: w,
      height: h
    });
  }

} );