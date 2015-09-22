angular.module("LMApp").constant("CONSTANTS", {
	/**
	 * Data files
	 */
	"DATA_FILES": {
		"CONTACT": "contact.json",
		"EXPERIENCE": "experience.json",
		"EXPERIENCE_TIMELINE": "experience-timeline.json",
		"PORTFOLIO": "portfolio.json",
		"TECHNICAL_SUMMARY": "technical-summary.json",
		"WELCOME": "welcome.json"
	},

	/**
	 * Path/Directory constants
	 */
	"PATH": {
		"PARTIAL": "partial/",
		"DATA": "data/"
	},

	/**
	 * Application state constants
	 */
	"STATE": {
		"INTRO": {
			"NAME": "intro",
			"URL": "/",
			"TEMPLATE": "intro/intro.html"
		},
		"WELCOME": {
			"NAME": "welcome",
			"URL": "/welcome",
			"TEMPLATE": "welcome/welcome.html"
		},
		"TECHNICAL_SUMMARY": {
			"NAME": "technical-summary",
			"URL": "/technicalSummary",
			"TEMPLATE": "technical-summary/technical-summary.html"
		},
		"EXPERIENCE": {
			"NAME": "experience",
			"URL": "/experience",
			"TEMPLATE": "experience/experience.html"
		},
		"PORTFOLIO": {
			"NAME": "portfolio",
			"URL": "/portfolio",
			"TEMPLATE": "portfolio/portfolio.html"
		},
		"CONTACT": {
			"NAME": "contact",
			"URL": "/contact",
			"TEMPLATE": "contact/contact.html"
		}

	}
});
