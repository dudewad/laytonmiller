/**
 * Grunt task - dev
 */
module.exports = function(grunt){
    grunt.registerTask("dev", [
	    "githooks",
        "jshint",
	    "webfont",
        "sass:dev",
        "concat:dev"
    ]);
};