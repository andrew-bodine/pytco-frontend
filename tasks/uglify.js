module.exports = function (grunt) {
  grunt.config.set('uglify', {
    dist: {
      src: ['.build/dist/app.js'],
      dest: '.build/dist/app.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
