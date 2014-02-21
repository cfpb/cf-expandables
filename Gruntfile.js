module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);

  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    
    /**
     * Pull in the package.json file so we can read its metadata.
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Here's a banner with some template variables.
     * We'll be inserting it at the top of minified assets.
     */
    banner: grunt.file.read('docs/cfpb-banner.txt'),

    /**
     * Bower: https://github.com/yatskevich/grunt-bower-task
     * 
     * Install Bower packages. Smartly.
     */
    bower: {
      install: {
        options: {
          targetDir: 'src/vendor/',
          install: true,
          verbose: true,
          cleanBowerDir: true,
          cleanTargetDir: true,
          layout: function(type, component) {
            if (type === 'img') {
              return path.join('../../demo/static/img');
            } else if (type === 'fonts') {
              return path.join('../../demo/static/fonts');
            } else {
              return path.join(component);
            }
          }
        }
      }
    },

    /**
     * Clean: https://github.com/gruntjs/grunt-contrib-clean
     * 
     * Clean files and folders.
     */
    clean: {
      dist: ['dist'],
      vendor: ['src/vendor/cf-concat/cf.less']
    },

    /**
     * Concat: https://github.com/gruntjs/grunt-contrib-concat
     * 
     * Concatenate files.
     */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/js/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      main: {
        src: [
          'src/*.less',
          'src/less/*.less',
          'src/vendor/cf-*/*.less',
          'src/vendor/font-awesome/font-awesome.css'
        ],
        dest: 'src/vendor/cf-concat/cf.less',
      },
      'lt-ie8': {
        src: [
          'src/vendor/font-awesome/font-awesome-ie7.min.css'
        ],
        // Using .min keeps topdoc from rendering it as a demo page
        dest: 'demo/static/css/main.lt-ie8.min.css',
      },
      bodyScripts: {
        src: [
          'src/vendor/jquery/jquery.js',
          'src/vendor/cf-*/*.js',
          'src/*.js',
          'src/js/*.js'
        ],
        dest: 'demo/static/js/component.js',
      }
    },

    /**
     * LESS: https://github.com/gruntjs/grunt-contrib-less
     * 
     * Compile LESS files to CSS.
     */
    less: {
      main: {
        options: {
          paths: grunt.file.expand('src/vendor/**/'),
          yuicompress: false
        },
        files: {
          'demo/static/css/main.css': [
            'src/vendor/normalize-css/normalize.css',
            'src/vendor/cf-concat/cf.less'
          ]
        }
      },
      dist: {
        options: {
          paths: grunt.file.expand('src/vendor/**/'),
          yuicompress: true
        },
        files: {
          'dist/static/css/cf-expandables.css': [
            'src/vendor/normalize-css/normalize.css',
            'src/vendor/cf-concat/cf.less'
          ]
        }
      }
    },

    /**
     * string-replace: https://github.com/erickrdch/grunt-string-replace
     * 
     * Replaces strings on files by using string or regex patterns.
     * Attempts to be a String.prototype.replace adapter task for your grunt project.
     */
    'string-replace': {
      vendor: {
        files: {
          'demo/static/css/': [
            'demo/static/css/main.css',
            'demo/static/css/main.lt-ie8.css'
          ]
        },
        options: {
          replacements: [{
            pattern: /url\((.*?)\)/ig,
            replacement: function (match, p1, offset, string) {
              var path, pathParts, pathLength, filename, newPath;
              path = p1.replace(/["']/g,''); // Removes quotation marks if there are any
              pathParts = path.split('/'); // Splits the path so we can find the filename
              pathLength = pathParts.length;
              filename = pathParts[pathLength-1]; // The filename is the last item in pathParts

              grunt.verbose.writeln('');
              grunt.verbose.writeln('--------------');
              grunt.verbose.writeln('Original path:');
              grunt.verbose.writeln(match);
              grunt.verbose.writeln('--------------');

              // Rewrite the path based on the file type
              // Note that .svg can be a font or a graphic, not usre what to do about this.
              if (filename.indexOf('.eot') !== -1 ||
                  filename.indexOf('.woff') !== -1 ||
                  filename.indexOf('.ttf') !== -1 ||
                  filename.indexOf('.svg') !== -1)
              {
                newPath = 'url("../fonts/'+filename+'")';
                grunt.verbose.writeln('New path:');
                grunt.verbose.writeln(newPath);
                grunt.verbose.writeln('--------------');
                return newPath;
              } else if (filename.indexOf('.png') !== -1 ||
                  filename.indexOf('.gif') !== -1 ||
                  filename.indexOf('.jpg') !== -1)
              {
                newPath = 'url("../img/'+filename+'")';
                grunt.verbose.writeln('New path:');
                grunt.verbose.writeln(newPath);
                grunt.verbose.writeln('--------------');
                return newPath;
              } else {
                grunt.verbose.writeln('No new path.');
                grunt.verbose.writeln('--------------');
                return match;
              }

              grunt.verbose.writeln('--------------');
              return match;
            }
          }]
        }
      }
    },

    /**
     * autoprefixer: https://github.com/nDmitry/grunt-autoprefixer
     * 
     * Autoprefixer parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
     */
    autoprefixer: {
      options: {
        // Options we might want to enable in the future.
        diff: false,
        map: false
      },
      multiple_files: {
        // Prefix all CSS files found in `src/static/css` and overwrite.
        expand: true,
        src: 'demo/static/css/main.css'
      },
    },

    /**
     * Uglify: https://github.com/gruntjs/grunt-contrib-uglify
     * 
     * Minify files with UglifyJS.
     */
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      component: {
        src: ['demo/static/js/component.js'],
        dest: 'demo/static/js/component.min.js'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },

    /**
     * Copy: https://github.com/gruntjs/grunt-contrib-copy
     * 
     * Copy files and folders.
     */
    copy: {
      docs_assets: {
        files:
        [{
          expand: true,
          cwd: 'demo/',
          src: [
            'static/img/**',
            'static/fonts/**'
          ],
          dest: 'docs/'
        }]
      },
      docs: {
        files:
        [{
          expand: true,
          cwd: 'demo/',
          src: [
            'static/css/main.css',
            'static/js/*.js'
          ],
          dest: 'docs/'
        }]
      },
      dist_assets: {
        files:
        [{
          expand: true,
          cwd: 'demo/',
          src: [
            'static/fonts/**'
          ],
          dest: 'dist/'
        }]
      }
    },

    /**
     * Grunt Topdoc: https://github.com/topcoat/grunt-topdoc
     * 
     * Grunt tasks for Topdoc automation.
     */
    topdoc: {
      demo: {
        options: {
          source: 'demo/static/css/',
          destination: 'demo/',
          template: 'node_modules/cf-component-demo/' + ( grunt.option('tpl') || 'raw' ) + '/',
          templateData: {
            family: '<%= pkg.name %>',
            title: '<%= pkg.name %> demo',
            repo: '<%= pkg.homepage %>',
            jsBody: 'static/js/component.min.js',
            custom: '<%= grunt.file.read("demo/custom.html") %>'
          }
        }
      },
      docs: {
        options: {
          source: 'docs/static/css/',
          destination: 'docs/',
          template: 'node_modules/cf-component-demo/' + ( grunt.option('tpl') || 'code_examples' ) + '/',
          templateData: {
            family: '<%= pkg.name %>',
            title: '<%= pkg.name %> docs',
            repo: '<%= pkg.homepage %>',
            jsBody: 'static/js/component.min.js'
          }
        }
      }
    },

    /**
     * QUnit: https://github.com/gruntjs/grunt-contrib-qunit
     * 
     * Run QUnit unit tests in a headless PhantomJS instance.
     */
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:3000/test/cf-expandables.html'
          ]
        }
      }
    },

    /**
     * Connect: https://github.com/gruntjs/grunt-contrib-connect
     * 
     * Start a connect web server.
     */
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    /**
     * JSHint: https://github.com/gruntjs/grunt-contrib-jshint
     * 
     * Validate files with JSHint.
     */
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/js/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     * 
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     */
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'connect', 'qunit']
      },
    }
  });

  /**
   * The above tasks are loaded here.
   */
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-topdoc');

  /**
   * The 'default' task will run whenever `grunt` is run without specifying a task.
   * `grunt test` runs all the testing stuff.
   */
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
  grunt.registerTask('vendor', ['clean', 'bower', 'copy:docs_assets', 'concat']);
  grunt.registerTask('default', ['test', 'clean', 'concat', 'less', 'string-replace', 'autoprefixer', 'uglify', 'copy:docs', 'topdoc']);

};
