/**
 * Grunt task - dev
 */
module.exports = function(grunt){
    grunt.registerTask("dev", [
	    "githooks",
        "jshint",
	    "sprite",
        "sass:dev",
        "concat:dev"
    ]);
};