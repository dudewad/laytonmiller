/**
 * Grunt task - dev
 */
module.exports = function(grunt){
    grunt.registerTask("dev", [
	    "githooks",
        "jshint",
        "sass:dev",
        "concat:dev"
    ]);
};