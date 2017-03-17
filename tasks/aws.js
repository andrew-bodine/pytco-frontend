var URL = require('url');

module.exports = function (grunt) {
  var credentials = grunt.file.readJSON('credentials.json');

  grunt.config.set('aws', credentials);

  grunt.config.set('s3', {
    options: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      bucket: credentials.s3.bucket
    },

    templates: {
      cwd: '.build/dist/',
      src: '**/*.html'
    },

    scripts: {
      cwd: '.build/dist',
      src: '**/*.min.js'
    },

    styles: {
      cwd: '.build/dist',
      src: '**/*.min.css'
    },

    fonts: {
      cwd: '.build/dist',
      src: '**/*.{ttf,woff,woff2}'
    }
  });

  var url = new URL(credentials.cloudfront.url);
  var distributionId = url.hostname.split('.')[0];

  grunt.config.set('cloudfront', {
    options: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      distributionId: distributionId
    },
    html: {
      options: {
        defaultRootObject: 'index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws');
};
