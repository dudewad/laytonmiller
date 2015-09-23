angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "CONSTANTS", "STRINGS", "AnimationService", "$timeout", function($rootScope, $scope, $state, CONSTANTS, STRINGS, AnimationService, $timeout){
	$scope.currentSection = "intro";
	$scope.STRINGS = STRINGS.CORE;

	$rootScope.$on("$stateChangeStart", function (e, toState, params, fromState) {
		$scope.currentSection = toState.name;
		AnimationService.transition.pageTransition(toState, fromState);
	});

	/*$timeout(function(){
		$state.go(CONSTANTS.STATE.TECHNICAL_SUMMARY.NAME);
	}, 500);*/



	angular.element(document).on("click", function(e){
		$rootScope.$broadcast("documentClick", {$event: e});
	});
	angular.element("body").on("selectstart", function(){
		return false;
	});
}]);