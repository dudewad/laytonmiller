/**
 * Grunt task configuration - watch
 */
module.exports = {
	scss: {
		files: ["<%=pkg.directories.dev_root %><%=pkg.directories.scss %>**/*.scss"],
		tasks: ["sass:dev"]
	},
	"concat": {
		files: ["<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>**/*.js"],
		tasks: ["concat:dev"]
	},
	livereload: {
		files: [
			"<%=pkg.directories.dev_root %><%=pkg.directories.image %>**/*",
			"<%=pkg.directories.dev_root %><%=pkg.directories.style %>**/*",
			"<%=pkg.directories.dev_root %><%=pkg.directories.script %>app.js"
		],
		options: {
			livereload: true
		}
	}
};