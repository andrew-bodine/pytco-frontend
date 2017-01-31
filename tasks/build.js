module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:build',
    'sass:build',
    'concat:build',
    'replace:build',
    'copy:build',
    'sails-linker:buildCss',
    'sails-linker:buildJs'
  ]);
};
