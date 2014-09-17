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

/**
 * Helpful namespace automation provided by 
 * http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
 * @param  {String} namespaceString namesspace string we want to declare
 * @return {}                 object namespace will generate
 */
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}

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

(function ($) { "use strict";

  $.extend($, {
    $window: $(window),
    $body: $('body')
  });
  




  $(document).ready(function () {
    var app = new controllers.MainController();
  })
})(jQuery);