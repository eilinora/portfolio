'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'public'
  };

  var livereloadOptions = {};


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    configObj: appConfig,
    livereloadConfig: {},

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= configObj.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all', 'newer:copy:devScripts'],
        options: {
          livereload: '<%= connect.livereload.options %>'
        }
      },
      jshint: {
        all: {
          src: ['<%= configObj.app %>/scripts/**/*.js'],
        },
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'newer:copy:fonts', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // grunt-contrib-connect will serve the files of the project
    // on specified port and hostname
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "0.0.0.0",
          // No need for keepalive anymore as watch will keep Grunt running
          //keepalive: true,

          // Livereload needs connect to insert a cJavascript snippet
          // in the pages it serves. This requires using a custom connect middleware
          middleware: function(connect, options) {

            return [

              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,

              // Serve the project folder
              connect.static(options.base)
            ];
          }
        }
      }
    },
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    // grunt-regarde monitors the files and triggers livereload
    // Surprisingly, livereload complains when you try to use grunt-contrib-watch instead of grunt-regarde
    regarde: {
      all: {
        // This'll just watch the index.html file, you could add **/*.js or **/*.css
        // to watch Javascript and CSS files too.
        files:['index.html'],
        // This configures the task that will run when the file change
        tasks: ['livereload']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,**/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
  });

  // on watch events configure jshint:all to only run on changed file
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  // Creates the `server` task
  grunt.registerTask('server',[

    // Starts the livereload server to which the browser will connect to
    // get notified of when it needs to reload
    'livereload-start',
    'connect',
    // Connect is no longer blocking other tasks, so it makes more sense to open the browser after the server starts
    'open',
    // Starts monitoring the folders and keep Grunt alive
    'regarde'
  ]);

};