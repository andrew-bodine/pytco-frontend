module.exports = function (grunt) {
  grunt.config.set('copy', {
    build: {
      files: [
        {
          expand: true,
          cwd: './app',
          src: [
            'bower_components/**/*',
            '**/*.html'
          ],
          dest: '.build/dev'
        }
      ]
    },

    dist: {
      files: [
        {
          expand: true,
          cwd: './app',
          src: [
            'bower_components/**/*',
            '**/*.html'
          ],
          dest: '.build/dist'
        }
      ]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
