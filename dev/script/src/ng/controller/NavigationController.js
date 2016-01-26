angular.module("LMApp").controller("NavigationController", ["$scope", "CONSTANT", "GlobalEventsService", "STRINGS", function ($scope, CONSTANT, GlobalEventsService, STRINGS) {
	$scope.NAV_STRINGS = STRINGS.CORE.NAVIGATION;
	$scope.LANGUAGE_STRINGS = STRINGS.CORE.LANGUAGE_SELECTOR;
	$scope.currentState = {
		active: false
	};

	$scope.navItems = [
		{
			"className": "technical-summary",
			"sref": CONSTANT.STATE.TECHNICAL_SUMMARY.NAME,
			"text": $scope.NAV_STRINGS.TECHNICAL_SUMMARY,
			"isHovered": false
		},
		{
			"className": "experience",
			"sref": CONSTANT.STATE.EXPERIENCE.NAME,
			"text": $scope.NAV_STRINGS.EXPERIENCE,
			"isHovered": false
		},
		{
			"className": "portfolio",
			"sref": CONSTANT.STATE.PORTFOLIO.NAME,
			"text": $scope.NAV_STRINGS.PORTFOLIO,
			"isHovered": false
		},
		{
			"className": "contact",
			"sref": CONSTANT.STATE.CONTACT.NAME,
			"text": $scope.NAV_STRINGS.CONTACT,
			"isHovered": false
		}
	];



	//quick and dirty to get it done. Come back later and fix this garbage.
	$scope.toggleNavigation = function () {
		$scope.currentState.active = !$scope.currentState.active;
		_applyScope();
	};



	function _applyScope() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}



	function _resizeHandler() {
		$scope.currentState.active = false;
	}



	angular.element(".nav-toggle").on("click", $scope.toggleNavigation);
	GlobalEventsService.registerResizeHandler(_resizeHandler);
}]);