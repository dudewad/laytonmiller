/**
 * Grunt task configuration - express
 */
module.exports = {
	dev: {
		options: {
			port: 9002,
			hostname: "0.0.0.0",
			bases: ["<%=pkg.directories.dev_root %>"],
			livereload: true
		}
	}
};