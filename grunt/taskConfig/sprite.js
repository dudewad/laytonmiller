/**
 * Grunt task configuration - sprite
 */
module.exports = {
	all: {
		cssVarMap: function (sprite) {
			sprite.name = "sprite-" + sprite.name;
		},
		src: ["<%=pkg.directories.dev_root %><%=pkg.directories.sprite %>**/*"],
		retinaSrcFilter: "<%=pkg.directories.dev_root %><%=pkg.directories.sprite %>*@2x.*",
		dest: "<%=pkg.directories.dev_root %><%=pkg.directories.image %>sprite.png",
		retinaDest: "<%=pkg.directories.dev_root %><%=pkg.directories.image %>sprite-retina.png",
		destCss: "<%=pkg.directories.dev_root %><%=pkg.directories.scss %>generated/_sprite.scss"
	}
};