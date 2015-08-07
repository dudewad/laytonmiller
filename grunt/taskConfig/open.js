/**
 * Grunt task configuration - open
 */
module.exports = {
	all: {
		// Gets the port from the connect configuration
		path: 'http://localhost:<%= express.all.options.port%>'
	}
};