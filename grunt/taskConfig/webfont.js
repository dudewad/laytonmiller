/**
 * Grunt task configuration - grunt-webfont
 */
module.exports = {
    dist: {
	    src: "<%=pkg.directories.dev_root %><%=pkg.directories.font %>lmIcon/src/**/*",
	    dest: "<%=pkg.directories.dev_root %><%= pkg.directories.font %>/lmIcon/",
	    destCss: "<%=pkg.directories.dev_root %><%= pkg.directories.scss %>/generated/",
	    options:{
		    font: "lmIcon",
		    engine: "node",
		    stylesheet: "scss",
		    templateOptions: {
			    baseClass: 'lmIcon',
			    classPrefix: 'lmIcon-'
		    }
	    }
    }
};