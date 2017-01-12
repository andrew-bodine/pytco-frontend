var bundles = {
  build: {
    css: [
      '.build/dev/bower_components/bootstrap/dist/css/bootstrap.css',
      '.build/dev/app.css'
    ],
    js: [
      '.build/dev/bower_components/jquery/dist/jquery.js',
      '.build/dev/bower_components/angular/angular.js',
      '.build/dev/bower_components/angular-route/angular-route.js',
      '.build/dev/bower_components/bootstrap/dist/js/bootstrap.js',
      '.build/dev/app.js'
    ]
  },

  dist: {
    css: [
      // 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
      '.build/dist/bower_components/bootstrap/dist/css/bootstrap.min.css',
      '.build/dist/app.min.css'
    ],
    js: [
      // {
      //   src: 'https://code.jquery.com/jquery-3.1.1.min.js',
      //   integrity: 'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=',
      //   crossorigin: 'anonymous'
      // },
      '.build/dist/bower_components/jquery/dist/jquery.min.js',
      '.build/dist/bower_components/angular/angular.min.js',
      '.build/dist/bower_components/angular-route/angular-route.min.js',
      '.build/dist/bower_components/bootstrap/dist/js/bootstrap.min.js',
      '.build/dist/app.min.js'
    ]
  }
};

module.exports = function (grunt) {
  grunt.config.set('sails-linker', {
    buildCss: {
      options: {
        startTag: '<!--styles:inject-->',
        endTag: '<!--styles:end-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.build/dev/'
      },
      files: {
        '.build/dev/index.html': bundles.build.css
      }
    },

    buildJs: {
      options: {
        startTag: '<!--scripts:inject-->',
        endTag: '<!--scripts:end-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.build/dev/'
      },
      files: {
        '.build/dev/index.html': bundles.build.js
      }
    },

    distCss: {
      options: {
        startTag: '<!--styles:inject-->',
        endTag: '<!--styles:end-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.build/dist/'
      },
      files: {
        '.build/dist/index.html': bundles.dist.css
      }
    },

    distJs: {
      options: {
        startTag: '<!--scripts:inject-->',
        endTag: '<!--scripts:end-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.build/dist/'
      },
      files: {
        '.build/dist/index.html': bundles.dist.js
      }
    }
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
