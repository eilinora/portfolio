'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');


  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'www/wordpress-default/wp-content/themes/portfolio'
  };


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    appConfig: appConfig,
    livereloadConfig: {},
    pkg: grunt.file.readJSON('package.json'),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      assets: {
        files: ['<%= appConfig.app %>/assets/fonts/**', '<%= appConfig.app %>/assets/images/**'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= appConfig.app %>/assets/scripts/**'],
        tasks: ['concat'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['<%= appConfig.app %>/**/**/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['<%= appConfig.app %>/scss/**/*.scss'],
        tasks: ['shell:dev-sass'],
        options: {
          livereload: true
        }
      },

      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    connect: {
      options: {
          port: 9001,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: '0.0.0.0'
      },
      livereload: {
          options: {
            open: true,
            base: [
              '.tmp',
              '<%= appConfig.dist %>'
          ]
          }
      }
    },

    clean: {
      build: ['.tmp', '<%= appConfig.dist %>/assets']
    },

    assemble: {
      options: {
        assets: '<%= appConfig.app %>/assets',
        plugins: ['permalinks'],
        partials: ['<%= appConfig.app %>/partials/**/*.hbs'],
        layoutdir: '<%= appConfig.app %>/layouts',
        data: ['<%= appConfig.app %>/data/**/*.{json,yml}']
      },
      site: {
        options: {
          layout: 'default.hbs',
          assets: '/assets',
          css_path: '/assets/styles',
          img_path: '/assets/images',
          js_path: '/assets/scripts'
        },
        expand: true,
        cwd: '<%= appConfig.app %>/',
        src: ['*.hbs'],
        dest: '<%= appConfig.dist %>'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      vendor: {
        src: ['<%= appConfig.app %>/assets/scripts/vendor/**'],
        dest: '<%= appConfig.dist %>/assets/scripts/vendor.js',
      },
      js: {
        src: ['<%= appConfig.app %>/assets/scripts/*.*'],
        dest: '<%= appConfig.dist %>/assets/scripts/main.js',
      },
    },

    copy: {
      local: {
        files: [{
            expand: true,
            cwd: '<%= appConfig.app %>/assets/images/',
            src: '**/*',
            dest: '<%= appConfig.dist %>/assets/images/'
        }, {
            expand: true,
            cwd: '<%= appConfig.app %>/assets/fonts/',
            src: '**/*',
            dest: '<%= appConfig.dist %>/assets/fonts/'
        }, {
            expand: true,
            cwd: '<%= appConfig.app %>/assets/video/',
            src: '**/*',
            dest: '<%= appConfig.app %>/assets/video/'
        }],
      },
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    // jshint: {
    //  options: {
    //    jshintrc: '.jshintrc',
    //    reporter: require('jshint-stylish')
    //  },
    //  all: {
    //    src: [
    //      'Gruntfile.js',
    //      '<%= appConfig.app %>/scripts/{,**/}*.js'
    //    ]
    //  }
    // },

    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      'dev-sass': {
        command: 'bundle exec compass compile --environment dev --force'
      },
      'deploy-sass': {
        command: 'bundle exec compass compile --environment production --force'
      }
    }
  });

  // on watch events configure jshint:all to only run on changed file
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  grunt.registerTask('styles', [
    'shell:deploy-sass'
  ]);

  grunt.registerTask('default', [
    // 'jshint',
    'clean:build',
    // 'assemble',
    'shell:dev-sass',
    'copy:local',
    'concat',
    // 'connect:livereload',
    'watch',
    'open'
  ]);

  grunt.registerTask('build', [
    // 'jshint',
    'clean:build',
    'assemble',
    'shell:deploy-sass',
    'copy:buildCopy'
  ]);

};