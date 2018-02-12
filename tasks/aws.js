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

  grunt.config.set('cloudfront', {
    options: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      distributionId: credentials.cloudfront.id
    },
    html: {
      options: {
        invalidations: ['/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws');
};
