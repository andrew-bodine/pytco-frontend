module.exports = function (grunt) {
  grunt.config.set('copy', {

    dev: {
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

    // build: {
    //   files: []
    // }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
