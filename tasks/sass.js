module.exports = function (grunt) {
  grunt.config.set('sass', {
    dev: {
      files: [{
        expand: true,
        cwd: 'app/',
        src: ['app.scss'],
        dest: '.build/dev/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
