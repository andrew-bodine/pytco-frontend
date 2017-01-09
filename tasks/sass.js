module.exports = function (grunt) {
  grunt.config.set('sass', {
    build: {
      files: [{
        expand: true,
        cwd: 'app/',
        src: ['app.scss'],
        dest: '.build/dev/',
        ext: '.css'
      }]
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'app/',
        src: ['app.scss'],
        dest: '.build/dist/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
