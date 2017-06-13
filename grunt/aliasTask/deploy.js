/**
 * Grunt task - deploy-qa
 *
 * Note: this task runs the dev and dist alias tasks as well. It's best to have it all in sync.
 */
module.exports = function (grunt) {
    grunt.registerTask("deploy:qa", [
	    //dist runs dev, so environments will be in sync
        "dist",
        "ftp-deploy:qa"
    ]);
    grunt.registerTask("deploy:prod", [
	    //dist runs dev, so environments will be in sync
        "dist",
        "ftp-deploy:prod"
    ]);
};