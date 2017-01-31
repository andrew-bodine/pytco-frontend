module.exports = function (grunt) {
  var credentials = grunt.file.readJSON('credentials.json');

  grunt.config.set('replace', {
    build: {
      options: {
        patterns: [
          {
            match: /CLOUDFRONT_URL/g,
            replacement: credentials.cloudfront.url
          }
        ]
      },
      files: [
        {expand: true, flatten: true, src: ['.build/dev/app.js'], dest: '.build/dev/'}
      ]
    },
    dist: {
      options: {
        patterns: [
          {
            match: /CLOUDFRONT_URL/g,
            replacement: credentials.cloudfront.url
          }
        ]
      },
      files: [
        {expand: true, flatten: true, src: ['.build/dist/app.js'], dest: '.build/dist/'}
      ]
    }
  });

  grunt.loadNpmTasks('grunt-replace');
};
