/**
 * Grunt alias task - server
 */
module.exports = function (grunt) {
	grunt.registerTask("server", [
		'express:dev',
		'open:dev',
		'watch'
	]);
};