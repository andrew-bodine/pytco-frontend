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
      // NOTE: It appears that CloudFront will eventually update automatically from the S3 bucket.
      // For now we will disable the `touch` to the cloudfront that rebuilds the distro. We will
      // leave this here for now, just to be sure.
      command: 'docker exec pytco-frontend grunt s3; docker exec pytco-frontend grunt cloudfront'
    }
  });

  grunt.loadNpmTasks('grunt-shell');
};
