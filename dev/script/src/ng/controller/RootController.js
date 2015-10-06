angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "CONSTANTS", "STRINGS", "AnimationService", "$timeout", function($rootScope, $scope, $state, CONSTANTS, STRINGS, AnimationService){
	$scope.currentSection = "intro";
	$scope.transitioning = false;
	$scope.STRINGS = STRINGS.CORE;
	var transitionHandlers = [];

	$rootScope.$on("$stateChangeStart", function (e, toState, params, fromState) {
		$scope.transitioning = !$scope.transitioning;
		if($scope.transitioning){
			e.preventDefault();
			for (var i = 0; i < transitionHandlers.length; i++) {
				var h = transitionHandlers[i];
				typeof h === "function" && (h)(toState, fromState);
			}
		}
		else {
			$scope.currentSection = toState.name;
		}
	});

	$scope.$on(CONSTANTS.EVENT.ANIMATION.INTRO_COMPLETE, function(){
		$state.go(CONSTANTS.STATE.TECHNICAL_SUMMARY.NAME);
	});

	$scope.$on(CONSTANTS.EVENT.ANIMATION.PAGE_TRANSITION_COMPLETE, function(e, toState, fromState){
		$state.go(toState);
	});


	$scope.registerTransitionHandler = function(handler){
		transitionHandlers.push(handler);
	};

	angular.element("body").on("selectstart", function(){
		return false;
	});
}]);