var OUTPUT_DIR = '';
var SRC_DIR = 'src';

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: OUTPUT_DIR,
        src_path: SRC_DIR,
        pkg: grunt.file.readJSON('package.json'),
        tag: {
            banner: "/*!\n" +
            " * Paperclip: 2014\n" +
            " * @author Leroux van As\n" +
            " * @version 1.0.0\n" +
            " * Copyright 2014.\n" +
            " */\n"
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        cssmin: {
            options: {
                banner: "<%= tag.banner %>",
                keepSpecialComments: 0
            },
            app: {
                files: {
                    'css/production.min.css': [ 'css/production.css']
                }
            }
        },

        uglify: {
            options: {
                banner: "<%= tag.banner %>"
            },
            unminified: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    '<%= path %>js/foundation.js' : ['js/foundation/*.js'],
                    '<%= path %>js/lib.js' : ['js/lib/*.js']
                }
            },
            minified: {
                files: {
                    '<%= path %>js/foundation.min.js' : ['js/foundation/*.js'],
                    '<%= path %>js/lib.min.js' : ['js/lib/*.js']
                }
            },
            production: {
                files: {
                    '<%= path %>js/production.min.js' : [OUTPUT_DIR+'js/production.js']
                }
            }
        },
        watch: {
            options: { livereload: true },

            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['compass:dev', 'cssmin']
            },

            libs: {
                files: ['js/lib/**/*.js'],
                tasks: ['uglify']
            },

            foundation: {
                files: ['js/foundation/*.js'],
                tasks: ['uglify']
            },



            scriptsPROD: {
                files: ['js/production.js'],
                tasks: ['uglify:production']
            }
        }

    });

    grunt.registerTask('default', ['watch']);
};
