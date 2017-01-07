module.exports = function (grunt) {
  grunt.config.set('concat', {
    js: {
        src: [
          'app/*.js',
          'app/**!(bower_components)/*.js'
        ],
        dest: '.build/dev/app.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
