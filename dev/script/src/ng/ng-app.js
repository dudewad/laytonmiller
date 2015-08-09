var LMApp = angular.module("LMApp", ["ui.router"])
	//Set up routing
	.config(["$stateProvider", "$urlRouterProvider", "CONSTANTS", function ($stateProvider, $urlRouterProvider, CONSTANTS) {
		var STATE = CONSTANTS.STATE;
		var PATH = CONSTANTS.PATH;

		$stateProvider
			.state(STATE.TECHNICAL_SUMMARY.NAME, {
				url: STATE.TECHNICAL_SUMMARY.URL,
				views: {
					"contentMain": {
						templateUrl: PATH.PARTIAL + STATE.TECHNICAL_SUMMARY.TEMPLATE,
						controller: "TechnicalSummaryController"
					}
				}
			})
			.state(STATE.EXPERIENCE.NAME, {
				url: STATE.EXPERIENCE.URL,
				views: {
					"contentMain":{
						templateUrl: PATH.PARTIAL + STATE.EXPERIENCE.TEMPLATE,
						controller: "ExperienceController"
					}
				}
			})
			.state(STATE.PORTFOLIO.NAME, {
				url: STATE.PORTFOLIO.URL,
				views: {
					"contentMain": {
						templateUrl: PATH.PARTIAL + STATE.PORTFOLIO.TEMPLATE,
						controller: "PortfolioController"
					}
				}
			})
			.state(STATE.CONTACT.NAME, {
				url: STATE.CONTACT.URL,
				views: {
					"contentMain": {
						templateUrl: PATH.PARTIAL + STATE.CONTACT.TEMPLATE,
						controller: "ContactController"
					}
				}
			});

		$urlRouterProvider.otherwise(STATE.DEFAULT.URL);
	}]);