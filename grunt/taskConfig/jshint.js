module.exports = {
    default: {
        options: {
            quotmark: "double",
            curly: true,
	        //"expr" Allows code like:
	        //somevar && somevar.methodRequiringSomevar()
	        expr: true
        },
        src: [
	        "<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>**/*.js",
	        "!<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>/vendor/**/*.js",
	        "!<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>polyfills.js"
        ]
    }
};