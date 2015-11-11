/*
     * grunt-init
     * https://gruntjs.com/
     *
     * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
     * Licensed under the MIT license.
     */

    'use strict';
    
    var rewrite = require('connect-modrewrite');
    //http://danburzo.ro/grunt/chapters/server/
    
    module.exports = function(grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
          all: [
            'Gruntfile.js',
            'js/init.js',
          ],
          options: {
            globals: {
              jQuery: true,
              console: false,
              module: true
            }
          }
        },

        uglify: {
          dist: {
            files: {
              'js/init.min.js': ['js/init.js']
            }
          }
        },

        sass: {
          options: {
              sourceMap: true
          },
          dist: {
              files: {
                  'css/style.css': 'sass/style.scss',
                  'css/style-wide.css': 'sass/style-wide.scss',
                  'css/style-mobile.css': 'sass/style-mobile.scss',
                  'css/style-mobilep.css': 'sass/style-mobilep.scss',
                  'css/style-narrow.css': 'sass/style-narrow.scss',
                  'css/style-narrower.css': 'sass/style-narrower.scss',
                  'css/style-normal.css': 'sass/style-normal.scss'
              }
          }
        },

        watch: {
          html: {
            files: ['index.html'],
            tasks: [],
            options: {
              livereload: true,
            }
          },
          js: {
            files: ['js/init.js'],
            tasks: ['uglify:dist'],
            options: {
              livereload: true,
            }
          },
          sass: { 
            files: ['sass/*.scss'],
            tasks: ['sass'],
            options: {
              livereload: true,
            }
          }
        },

        connect: {
          server: {
            options: {
              //keepalive: true,
              port: 8081,
              hostname: 'localhost',
              middleware: function(connect, options) {
                var middleware = [];

                // 1. mod-rewrite behavior
                var rules = [
                    //'!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html',
                    '^/landing/(.*) /$1'
                ];
                middleware.push(rewrite(rules));

                // 2. original middleware behavior
                var base = options.base;
                if (!Array.isArray(base)) {
                    base = [base];
                }
                base.forEach(function(path) {
                    middleware.push(connect.static(path));
                });

                return middleware;
              }
            }
          }
        }

      });

      // These plugins provide necessary tasks.
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-connect');

      // By default, lint and run all tests.
      grunt.registerTask('default', ['uglify','sass']);
      grunt.registerTask('serve', ['connect','watch']);

    };