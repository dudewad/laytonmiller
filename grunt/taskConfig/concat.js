module.exports = {
	options: {
		separator: ";\r\n"
	},


	/**
	 * Dev
	 */
	dev: {
		files: {
			"<%=pkg.directories.dev_root %><%=pkg.directories.script %>app.js": [
				"<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>**/*.js",
				"!<%=pkg.directories.dev_root %><%=pkg.directories.script %>app.js"
			],
			"<%=pkg.directories.dev_root %><%=pkg.directories.script %>vendor.js": [
				"<%=pkg.directories.dev_root %><%=pkg.directories.bowerComponents %>jQuery/dist/jquery.min.js",
				"<%=pkg.directories.dev_root %><%=pkg.directories.bowerComponents %>angular/angular.min.js",
				"<%=pkg.directories.dev_root %><%=pkg.directories.bowerComponents %>greensock/src/minified/TimelineMax.min.js"
			]
		}
	},


	/**
	 * Prod
	 */
	dist: {
		files: {
			"<%=pkg.directories.prod_root %><%=pkg.directories.script %>app.js": [
				"<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>**/*.js",
				"!<%=pkg.directories.dev_root %><%=pkg.directories.script %>app.js"
			],
			"<%=pkg.directories.prod_root %><%=pkg.directories.script %>vendor.js": [
				"<%=pkg.directories.dev_root %><%=pkg.directories.bowerComponents %>jQuery/dist/jquery.min.js",
				"<%=pkg.directories.dev_root %><%=pkg.directories.bowerComponents %>angular/angular.min.js",
				"<%=pkg.directories.dev_root %><%=pkg.directories.bowerComponents %>greensock/src/minified/TimelineMax.min.js"
			]
		}
	}
};