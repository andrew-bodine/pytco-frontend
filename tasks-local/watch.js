module.exports = function(grunt) {

  grunt.config.set('watch', {
    assets: {

      // Assets to watch:
      files: [
        'app/**/*'
      ],

      // When assets are changed:
      tasks: [
        'deploy'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
