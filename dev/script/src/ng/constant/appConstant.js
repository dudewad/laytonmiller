angular.module("LMApp").constant("CONSTANTS", {
	/**
	 * Path/Directory contstants
	 */
	"PATH": {
		"PARTIAL": "/partial/"
	},

	/**
	 * Application state constants
	 */
	"STATE": {
		"DEFAULT": {
			"NAME": "default",
			"URL": "",
			"TEMPLATE": "default.html"
		},
		"TECHNICAL_SUMMARY": {
			"NAME": "technical-summary",
			"URL": "technicalSummary/",
			"TEMPLATE": "technical-summary.html"
		},
		"EXPERIENCE": {
			"NAME": "experience",
			"URL": "experience/",
			"TEMPLATE": "experience.html"
		},
		"PORTFOLIO": {
			"NAME": "portfolio",
			"URL": "portfolio/",
			"TEMPLATE": "portfolio.html"
		},
		"CONTACT": {
			"NAME": "contact",
			"URL": "contact/",
			"TEMPLATE": "contact.html"
		}

	}
});
