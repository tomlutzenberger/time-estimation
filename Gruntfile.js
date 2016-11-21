/*global module:false*/

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      script: {
        files: 'js/main.js',
        tasks: ['compile']
      },
      html: {
        files: ['./*.pug'],
        tasks: ['pug']
      }
    },

    pug: {
      release: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'index.html': 'index.pug'
        }
      }
    },

    uglify: {
      options: {
        quoteStyle: 1,
        screwIE8: true
      },
      target: {
        files: {
          'main.min.js': 'main.js'
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'main.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['pug', 'uglify']);
  grunt.registerTask('lint', ['jshint']);

};
