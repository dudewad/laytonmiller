module.exports = {
    default: {
        options: {
            quotmark: "double",
            curly: true,
            indent: 4
        },
        src: [
            "<%=pkg.directories.dev_root %><%=pkg.directories.scriptSrc %>**/*.js"
        ]
    }
};