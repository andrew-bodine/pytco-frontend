module.exports = function (grunt) {
  grunt.config.set('clean', {
    build: [
      '.build/dev/**',
      '.sass-cache'
    ],
    dist: [
      '.build/dist/**',
      '.sass-cache'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
