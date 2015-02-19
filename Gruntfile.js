module.exports = function(grunt) {
  'use strict';
  
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['dist']
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/fonts', src: '**', dest: 'dist/fonts'},
          {expand: true, cwd: 'src/html', src: '**', dest: 'dist/html'}
        ]
      }
    },
    exec: {
      dist: {
        command: 'python -m SimpleHTTPServer 8000',
        stdout: false,
        stderr: true
      }
    },
    imagemin: {
      all: {
        files: [{
          expand: true,
            cwd: 'src/',
            src: ['images/*.{png,jpg,gif}'],
            dest: 'dist/'
        }]
      }
    },
    jshint: {
      options: {
          reporter: require('jshint-stylish')
      },
      main: [
          'src/scripts/*.js'
      ]
    },
    sass: {
      // Development settings
      dev: {
          options: {
              outputStyle: 'nested',
              sourceMap: true
          },
          files: [{
              expand: true,
              cwd: 'src/styles',
              src: ['*.scss'],
              dest: 'dist/styles',
              ext: '.css'
          }]
      },
      // Production settings
      prod: {
          options: {
              outputStyle: 'compressed',
              sourceMap: false
          },
          files: [{
              expand: true,
              cwd: 'src/styles',
              src: ['*.scss'],
              dest: 'dist/styles',
              ext: '.css'
          }]
      }
    },
    cssmin: {
      target: {
        options: {
          rebase: false
        },
        files: [{
          expand: true,
          cwd: 'dist/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      all: {
        files: [{
            expand: true,
            cwd: 'src/scripts',
            src: '**/*.js',
            dest: 'dist/scripts',
            ext: '.min.js'
        }]
      }
    },
    watch: {
      options: {
        spawn: false,
        reload: true,
        livereload: true,
      },
      scripts: {
        files: [
          'src/scripts/*.js'
        ],
        tasks: [
          'jshint',
          'uglify'
        ]
      },
      styles: {
        files: [
          'src/styles/*.scss'
        ],
        tasks: [
          'sass:dev'
        ]
      },
      html: {
        files: [
          'src/html/*.html'
        ],
        tasks: [
          'copy'
        ]
      }
    },
    open: {
      build : {
        path : 'http://localhost:8000/dist/html/',
        app: 'Safari'
      }
    }
  });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('dist',
    ['clean',
      'copy',
      'imagemin',
      'sass',
      'uglify:prod']
    );
    grunt.registerTask('default',
      ['jshint', 'sass', 'cssmin', 'open', 'watch']);
    };