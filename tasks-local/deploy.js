module.exports = function (grunt) {
  grunt.registerTask('deploy', [
    'shell:clean',
    'shell:pwd',
    'shell:build',
    'shell:run'
  ]);
};
