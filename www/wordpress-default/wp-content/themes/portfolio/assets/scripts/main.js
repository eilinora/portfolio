/*! portfolio - v0.0.0 - 2015-07-29 */(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

(function ($, _) {
  'use strict';

  var Sections = function (el, options) {
    this.$el = $(el);
    this.options = options;

    //do any basic setup required
    this.grabElements();
    this.addListeners();

    //initalize layout
    this.resize();
    this.checkInView();
  };

  $.extend(Sections.prototype, {
    grabElements: function () {
      this.$window = $(window);
      this.$body = $('body');
      this.$content = this.$el.find('> .content');
    },

    addListeners: function () {
      this.$window.on('resize', _.debounce(this.onWindowResize.bind(this), 100));
      this.$window.on('scroll', this.onScroll.bind(this));
    },

    resize: function () {
      var w = this.$window.width(),
          h = this.$window.height();

      w = (w < 320) ? 320 : w;
      h = (h < 320) ? 320 : h;

      this.$el.css({
        width: w,
        height: h
      });
    },

    checkInView: function () {
      // console.log(this.$el.position().top);
      // console.log(this.$body.scrollTop());
      // console.log(window.innerHeight);
      // console.log(this.$el.position());
      // console.log(this.$el.offset());
      // console.log('-----');

      // if (this.$el.position().top  === 0) {
      //   this.$el.addClass('fade-in');
      // }
      if (this.$body.scrollTop() + (window.innerHeight/2) > this.$el.position().top) {
        if (!this.$el.hasClass('fade-in')) {
          this.$el.addClass('fade-in');
          // console.log(this.$body.scrollTop() + (window.innerHeight/2), this.$el.position().top);
          // console.log('added!');
        }
      }
    },

    onWindowResize: function () {
      this.resize();
    },

    onScroll: function () {
      this.checkInView();
    }
  });


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('port.sections');
      var options = typeof option == 'object' && option;

      if (!data) $this.data('port.sections', (data = new Sections(this, options)));

      // if (option == 'toggle') data.toggle()
      // else if (option) data.setState(option)
    });
  }

  var old = $.fn.sections;

  $.fn.sections             = Plugin;
  $.fn.sections.Constructor = Sections;


  // SECTIONS NO CONFLICT
  // ==================

  $.fn.sections.noConflict = function () {
    $.fn.sections = old;
    return this;
  };


  // SECTIONS DATA-API
  // ===============

  $(window).on('load', function () {
    $('[data-sections').each(function () {
      var $section = $(this);
      Plugin.call($section, $section.data());
    });

    $('body').addClass('sections-ready');
  });


}(jQuery, _));