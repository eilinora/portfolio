var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  src: 'app',
  dist: 'www'
};

module.exports = function(grunt) {

  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),

    watch: {
      assemble: {
        files: ['<%= config.src %>/{,*/}*.hbs'],
        tasks: ['assemble:dist']
      },
      compass: {
        files: ['<%= config.src %>/assets/scss/{,*/}*.scss'],
        tasks: ['compass:dev']
      },
      concat: {
        files: ['<%= config.src %>/assets/js/{,*/}*.js'],
        tasks: ['concat:dist']
      },
      imagemin: {
        files: ['<%= config.src %>/assets/img/{,*/}*.{png,jpg,gif}'],
        tasks: ['imagemin']
      }

    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= bower.directory %>/bootstrap-sass-official/vendor/assets/fonts',
            src: ['**'],
            dest: '<%= config.dist %>/css/fonts'
          },
          {
            src: '<%= bower.directory %>/jquery/dist/jquery.min.js',
            dest: '<%= config.dist %>/js/vendor/jquery.min.js'
          }
        ]
      }
    },



    assemble: {
      options: {
        assets: '/',
        partials: ['<%= config.src %>/_includes/{,*/}*.hbs'],
        layoutdir: '<%= config.src %>/_layouts/',
        layout: ['default.hbs'],
        data: ['<%= config.src %>/_data/**/*.{json,yml}'],
        helpers: ['handlebars-helpers']
      },
      dist: {
        expand: true,
        cwd: '<%= config.src %>/_pages',
        src: '*.hbs',
        dest: '<%= config.dist %>'
      }
    },

    imagemin: {
      dynamic: { 
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.dist %>/assets/images'
        }]
      }
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: ['<%= config.src %>/assets/js/{*/,*/*/}*.js', '<%= config.src %>/assets/js/*.js'],
        dest: '<%= config.dist %>/assets/js/main.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      libraries: {
        files: {
          '<%= config.dist %>/assets/js/libs.min.js': [
              '<%= bower.directory %>/jquery/dist/jquery.min.js', 
              '<%= bower.directory %>/underscore/underscore.js', 
              '<%= bower.directory %>/backbone/backbone.js', 
          ]
        }
      },
      code: {
        files: {
          '<%= config.dist %>/assets/main.min.js': [
              '<%= config.dist %>/assets/js/main.js', 
          ]
        }
      }
    },

    compass: {
      options: {
        sassDir: '<%= config.src %>/assets/scss',
        cssDir: '<%= config.dist %>/assets/css',
        imagesDir: 'images',
        javascriptDir: 'js',
        fontsDir: 'css/fonts',
        httpImagesPath: '/assets/images',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        outputStyle: 'expanded',
        noLineComments: true,
        require: 'susy'
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          noLineComments: false
        }
      },
      main: {}
    }
  });

  // Load plugins to provide the necessary tasks
  grunt.loadNpmTasks('assemble');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [
    'assemble:dist',
    // 'copy:dist',
    'compass:main',
    'uglify:libraries',
    // 'uglify:code'
  ]);

};