module.exports = function (grunt) {
  grunt.config.set('concat', {
    build: {
        src: [
          'app/*.js',
          'app/**!(bower_components)/*.js'
        ],
        dest: '.build/dev/app.js'
    },
    dist: {
      src: [
        'app/*.js',
        'app/**!(bower_components)/*.js'
      ],
      dest: '.build/dist/app.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
