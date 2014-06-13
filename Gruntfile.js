module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
        // Task configuration
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'nodeunit']
            },
            compass: {
              files: './scss/**/*.{scss,sass,css}',
              tasks: ['compass', 'concat', 'clean']
            },            
        },
        // The actual grunt server settings
        connect: {
          all: {
            port: 8000,
            protocol: 'http',
            hostname: 'localhost',
            base: '.',
            directory: null,
            keepalive: false,
            debug: false,
            livereload: true,
            open: true,
          },
        },
        compass: {
          dist: {
            options: {
              sassDir: 'scss',
              cssDir: '.tmp',
            }
          },
        },
        concat: {
          options: {
            separator: ';'
          },
          dist: {
            src: ['.tmp/*.css'],
            dest: 'app.css'
          }
        },
        clean: [
            ".tmp"
        ],                      
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-install');

    // Default task
    grunt.registerTask('serve', [
      'connect',
      'watch',
    ]);
    grunt.registerTask('default', ['jshint', 'concat']);
};

