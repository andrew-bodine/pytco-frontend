module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'sass:dev',
    'concat:js',
    'copy:dev'
  ]);
};
