(function ($) { "use strict";

  $.extend($, {
    $window: $(window),
    $body: $('body')
  });
  




  $(document).ready(function () {
    var app = new controllers.MainController();
  })
})(jQuery);