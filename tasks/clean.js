module.exports = function (grunt) {
  grunt.config.set('clean', {
    dev: [
      '.build/dev/**',
      '.sass-cache'
    ],
    build: [
      '.build/prod',
      '.sass-cache'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
