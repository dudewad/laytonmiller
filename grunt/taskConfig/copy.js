/**
 * Grunt task configuration - copy
 */
module.exports = {
    /**
     * Production
     */
    dist: {
        files: [
            //Copy all HTML
            {
                expand: "true",
                cwd: "<%=pkg.directories.dev_root %>",
                src: "*.html",
                dest: "<%=pkg.directories.prod_root %>"
            },
            {
                expand: "true",
                cwd: "<%=pkg.directories.dev_root %>",
                src: ["<%=pkg.directories.asset %>**/*",
	                "<%=pkg.directories.data %>**/*",
	                "<%=pkg.directories.partial %>**/*",
	                "<%=pkg.directories.style %>**/*.css",
	                "!<%=pkg.directories.style %>**/*.css.map",
                    "!<%=pkg.directories.font %>/lmIcon/src/**/*"
                ],
                dest: "<%=pkg.directories.prod_root %>"
            }
        ]
    }
};