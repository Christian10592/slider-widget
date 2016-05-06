module.exports = function(grunt) {

  //Configure Project Settings
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //=========== Plugin List ==========//

    //Watch
    watch : {
      sass: {
        files: ['assets/style/scss/*.scss','assets/style/scss/globals/*.scss','assets/style/scss/slider/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      uglify: {
        files: ['assets/scripts/main.js'],
        tasks: ['uglify']
      }
    },

    //Sass Compiler
    sass: {
      dist: {
        files: {
          'assets/style/css/style.css': 'assets/style/scss/style.scss'
        }
      }
    },

    //JS Minify
    uglify: {
      dist: {
        files: {
          'assets/scripts/main.min.js': ['assets/scripts/main.js']
        }
      }
    },

    //CSS Minify
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'assets/style/css',
          src: ['*.css', '!*.min.css'],
          dest: 'assets/style/css',
          ext: '.min.css'
        }]
      }
    }

  });

  //=========== Load / Do ==========//

  //Load Plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //Do Tasks
  grunt.registerTask('default', ['watch']);

};
