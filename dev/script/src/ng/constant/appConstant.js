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

	"EVENT": {
		"ANIMATION": {
			"INTRO_COMPLETE": "INTRO_COMPLETE",
			"PAGE_TRANSITION_COMPLETE": "PAGE_TRANSITION_COMPLETE",
		}
	},

	/**
	 * Path/Directory constants
	 */
	"PATH": {
		"PARTIAL": "partial/",
		"DATA": "data/",
		"BACKGROUND_IMAGE": "asset/image/background/"
	},



	/**
	 * Screen size constants
	 */
	"SCREEN": {
		"XS": {
			"MIN": 0,
			"MAX": 767
		},
		"SM": {
			"MIN": 768,
			"MAX": 991
		},
		"MD": {
			"MIN": 992,
			"MAX": 1199
		},
		"LG": {
			"MIN": 1200,
			"MAX": 1399
		},
		"XL": {
			"MIN": 1400,
			"MAX": 999999999
		}
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
