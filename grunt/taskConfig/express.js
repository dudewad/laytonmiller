/**
 * Grunt task configuration - express
 */
module.exports = {
	all: {
		options: {
			port: 9000,
			hostname: "0.0.0.0",
			bases: ["<%=pkg.directories.dev_root %>"],
			livereload: true
		}
	}
};