module.exports = function (grunt) {
  grunt.registerTask('dist', [
    'clean:dist',
    'sass:dist',
    'cssmin:dist',
    'concat:dist',
    'replace:dist',
    'uglify:dist',
    'copy:dist',
    'sails-linker:distCss',
    'sails-linker:distJs'
  ]);
};
