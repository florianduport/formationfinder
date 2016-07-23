/**
 * Created by dionis on 6/17/2016.
 */
module.exports = function(grunt) {



  grunt.config.set('mochaTest', {
    test: {
      options: {
        reporter: 'spec'
      },
      src: ['tests/**/*.spec.js']
    }
  });
  grunt.loadNpmTasks('grunt-mocha-test');


};
