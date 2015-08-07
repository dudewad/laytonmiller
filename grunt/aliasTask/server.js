/**
 * Grunt alias task - server
 */
module.exports = function (grunt) {
	grunt.registerTask("server", [
		'express',
		'open',
		'watch'
	]);
};