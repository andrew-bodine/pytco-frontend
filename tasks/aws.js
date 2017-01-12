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
      src: '**/*.html',
      dest: 'app/'
    },

    scripts: {
      cwd: '.build/dist',
      src: '**/*.min.js',
      dest: 'app/'
    },

    styles: {
      cwd: '.build/dist',
      src: '**/*.min.css',
      dest: 'app/'
    }
  });

  grunt.loadNpmTasks('grunt-aws');
};
