/**
 * Grunt task configuration - ftp-deploy
 */
module.exports = {
    qa: {
        auth: {
            host: "<%=pkg.remote.ftp_qa.auth.host %>",
            port: "<%=pkg.remote.ftp_qa.auth.port %>",
            authKey: "key_ftp_qa"
        },
        src: "<%=pkg.directories.prod_root %>",
        dest: "<%=pkg.remote.ftp_qa.dest %>",
        exclusions: []
    },
	prod:{
		auth: {
			host: "<%=pkg.remote.ftp_prod.auth.host %>",
			port: "<%=pkg.remote.ftp_prod.auth.port %>",
			authKey: "key_ftp_prod"
		},
		src: "<%=pkg.directories.prod_root %>",
		dest: "<%=pkg.remote.ftp_prod.dest %>",
		exclusions: []
	}
};