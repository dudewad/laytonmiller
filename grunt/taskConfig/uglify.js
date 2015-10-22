/**
 * Grunt task configuration - uglify
 */
module.exports = {
    /**
     * Production
     */
    dist: {
        files: {
	        "<%=pkg.directories.prod_root %><%=pkg.directories.script %>app.js": "<%=pkg.directories.dev_root %><%=pkg.directories.script %>app.js",
	        "<%=pkg.directories.prod_root %><%=pkg.directories.script %>vendor.js": "<%=pkg.directories.dev_root %><%=pkg.directories.script %>vendor.js"
        }
    }
};