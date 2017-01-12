module.exports = function (grunt) {
  grunt.registerTask('release', [
    'shell:dist',
    'shell:release'
  ]);
};
