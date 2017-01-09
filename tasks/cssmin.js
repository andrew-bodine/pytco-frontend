module.exports = function (grunt) {
  grunt.config.set('cssmin', {
    dist: {
      src: ['.build/dist/app.css'],
      dest: '.build/dist/app.min.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
