module.exports = function (grunt) {
  grunt.config.set('shell', {
    clean: {
      command: 'docker rm -fv pytco-frontend || true',
    },

    pwd: {
      command: 'pwd'
    },

    build: {
      command: 'docker build -t pytco-frontend --force-rm .'
    },

    run: {
      command: 'docker run --name pytco-frontend -d -p 8000:8000 pytco-frontend'
    },

    dist: {
      command: 'docker exec pytco-frontend grunt dist'
    },

    release: {
      command: 'docker exec pytco-frontend grunt s3'
    }
  });

  grunt.loadNpmTasks('grunt-shell');
};
