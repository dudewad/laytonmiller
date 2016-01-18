angular.module("LMApp").constant("CONSTANT", {
	/**
	 * Data files
	 */
	"DATA_FILES": {
		"CONTACT": "contact.json",
		"EXPERIENCE": "experience.json",
		"EXPERIENCE_TIMELINE": "experience-timeline.json",
		"PORTFOLIO": "portfolio.json",
		"PORTFOLIO_TIMELINE": "portfolio-timeline.json",
		"TECHNICAL_SUMMARY": "technical-summary.json",
		"WELCOME": "welcome.json",
		"TIMELINE":{
			"EXPERIENCE": {
				"RAZORFISH": "/experience/razorfish.json"
				/*"DESIGN_MILL": "/experience/design-mill.json",
				"YACHT_VID": "/experience/yachtvid.json",
				"MUTUAL_AUTO_MEDIA": "/experience/mutual-auto-media.json",
				"GLOBANT": "/experience/globant.json"*/
			},
			"PORTFOLIO":{
				"INTEL": "/portfolio/intel.json",
				"RYSE": "/portfolio/ryse.json"
			}
		}
	},

	"EVENT": {
		"ANIMATION": {
			"INTRO_COMPLETE": "INTRO_COMPLETE"
		},
		"PAGE": {
			"TRANSITION_OUT_COMPLETE": "TRANSITION_OUT_COMPLETE",
			"TRANSITION_IN_COMPLETE": "TRANSITION_IN_COMPLETE"
		},
		"LM3D": {
			"VIEWPORT_STATE_UPDATED": "VIEWPORT_STATE_UPDATED",
			"MOUSE_MOVE": "MOUSE_MOVE"
		},
		"LMSREF": {
			"SREF_CHANGE": "SREF_CHANGE"
		},
		"TIMELINE": {
			"BUILT": "BUILT",
			"DATA_RECEIVED": "DATA_RECEIVED",
			"EVENT_OPENED": "EVENT_OPENED",
			"EVENT_CLOSED": "EVENT_CLOSED"
		},
		"COMPONENT_LOAD_START": "COMPONENT_LOAD_START",
		"COMPONENT_LOAD_COMPLETE": "COMPONENT_LOAD_COMPLETE"
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
		"EXPERIENCE_EVENT": {
			"NAME": "experience.event",
			"URL": "/{event}",
			"TEMPLATE": "timeline/timeline-event-full.html"
		},
		"PORTFOLIO": {
			"NAME": "portfolio",
			"URL": "/portfolio",
			"TEMPLATE": "portfolio/portfolio.html"
		},
		"PORTFOLIO_EVENT": {
			"NAME": "portfolio.event",
			"URL": "/{event}",
			"TEMPLATE": "timeline/timeline-event-full.html"
		},
		"CONTACT": {
			"NAME": "contact",
			"URL": "/contact",
			"TEMPLATE": "contact/contact.html"
		}

	}
});
