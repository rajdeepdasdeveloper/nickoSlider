module.exports = function(grunt) {

    grunt.registerTask('speak', function(){
        console.log('asd');
    });
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist : {
                src : [
                    'src/nicko-slider.js',
                ],
                dest: 'dist/nicko-slider.js'
            }
        },

        uglify: {
            build: {
                src: 'src/nicko-slider.js',
                dest: 'dist/nicko-slider.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style:'compressed'
                },
                files: {
                    'css/style.css' : 'css/style.scss'
                }
            }
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'src',
              src: ['*.css', '!*.min.css'],
              dest: 'dist',
              ext: '.min.css'
            }]
          }
        },
        copy: {
          main: {
            files: [
              // includes files within path
              {expand: true, src: ['src/nicko-slider.js'], dest: 'dist/', flatten: true},
              {expand: true, src: ['src/nicko-slider.css'], dest: 'dist/', flatten: true},

              // // includes files within path and its sub-directories
              // {expand: true, src: ['path/**'], dest: 'dest/'},

              // // makes all src relative to cwd
              // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

              // // flattens results to a single level
              // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
            ],
          },
        },
        // watch: {
            
        //     scripts: {
        //         files: ['src/*.js'],
        //         tasks: ['concat', 'uglify'],
        //         options: {
        //             spawn: false
        //         }
        //     },
        //     css : {
        //         files : ['css/*.scss'],
        //         tasks : ['sass', 'cssmin'],
        //         options : {
        //             spawn : false
        //         }
        //     }
        // }


    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'watch']);

};