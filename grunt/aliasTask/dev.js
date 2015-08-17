/**
 * Grunt task - dev
 */
module.exports = function(grunt){
    grunt.registerTask("dev", [
        "jshint",
        /*"scss-lint:dev",*/
        "sass:dev",
        "concat:dev"
    ]);
};