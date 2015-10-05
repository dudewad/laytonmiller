angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "CONSTANTS", "STRINGS", "AnimationService", "$timeout", function($rootScope, $scope, $state, CONSTANTS, STRINGS, AnimationService){
	$scope.currentSection = "intro";
	$scope.STRINGS = STRINGS.CORE;

	$rootScope.$on("$stateChangeStart", function (e, toState, params, fromState) {
		$scope.currentSection = toState.name;
		AnimationService.transition.pageTransition(toState, fromState);
	});

	$scope.$on(CONSTANTS.EVENT.ANIMATION.INTRO_COMPLETE, function(){
		$state.go(CONSTANTS.STATE.TECHNICAL_SUMMARY.NAME);
	});

	angular.element("body").on("selectstart", function(){
		return false;
	});
}]);