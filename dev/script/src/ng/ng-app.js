function LMApp_conditionalLoad($cookies) {
	var list = LMApp_conditionalLoadList;
	var lang = $cookies.get("lang");
	if(!lang) {
		lang = "EN_US";
		$cookies.put("lang", lang);
	}

	if(list && Array.isArray(list)){
		//Sort all lazy load items by conditional load type
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			try {
				switch (item.condition.toLowerCase()) {
					case "cookie":
						if(item.cookie.toLowerCase() === "lang" && item.value.toLowerCase() === lang.toLowerCase()){
							(item.fn)();
						}
						break;
				}
			}
			catch(e){
				console.warn("There was a problem conditionally loading a module definition.");
			}
		}
	}
}



var LMApp = angular.module("LMApp", ["ui.router", "ngCookies"])
	//Set up routing
	.config(["$stateProvider", "$urlRouterProvider", "CONSTANT", "$provide", function ($stateProvider, $urlRouterProvider, CONSTANT, $provide) {
		var STATE = CONSTANT.STATE;
		var PATH = CONSTANT.PATH;

		//Manually inject cookies service since its too early for services yet
		var $cookies;

		//Minification-safe cookie injection
		angular.injector(["ngCookies"]).invoke(["$cookies", function (_$cookies_) {
			$cookies = _$cookies_;
		}]);


		LMApp.constant = function(name, factory){
			$provide.constant(name, factory);
			return (this);
		};

		LMApp_conditionalLoad($cookies);

		$stateProvider
			.state(STATE.INTRO.NAME, {
				url: STATE.INTRO.URL,
				views: {
					"contentMain": {
						templateUrl: PATH.PARTIAL + STATE.INTRO.TEMPLATE
					}
				}
			})
			.state(STATE.WELCOME.NAME, {
				url: STATE.WELCOME.URL,
				views: {
					"contentMain": {
						templateUrl: PATH.PARTIAL + STATE.WELCOME.TEMPLATE
					}
				}
			})
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
			.state(STATE.EXPERIENCE_EVENT.NAME, {
				url: STATE.EXPERIENCE_EVENT.URL,
				views: {
					event: {
						templateUrl: PATH.PARTIAL + STATE.EXPERIENCE_EVENT.TEMPLATE,
						controller: "TimelineEventController"
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
			.state(STATE.PORTFOLIO_EVENT.NAME, {
				url: STATE.PORTFOLIO_EVENT.URL,
				views: {
					event: {
						templateUrl: PATH.PARTIAL + STATE.PORTFOLIO_EVENT.TEMPLATE,
						controller: "TimelineEventController"
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

		$urlRouterProvider.otherwise(STATE.INTRO.URL);
	}]);