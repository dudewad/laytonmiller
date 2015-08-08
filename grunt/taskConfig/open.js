/**
 * Grunt task configuration - open
 */
module.exports = {
	dev: {
		// Gets the port from the connect configuration
		path: 'http://localhost:<%= express.dev.options.port%>'
	}
};