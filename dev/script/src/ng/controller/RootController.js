angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "CONSTANTS", "STRINGS", "AnimationService", "$timeout", function($rootScope, $scope, $state, CONSTANTS, STRINGS, AnimationService){
	$scope.currentSection = "intro";
	$scope.STRINGS = STRINGS.CORE;

	$rootScope.$on("$stateChangeStart", function (e, toState, params, fromState) {
		$scope.currentSection = toState.name;
		AnimationService.transition.pageTransition(toState, fromState);
	});


	angular.element(document).on("click", function(e){
		$rootScope.$broadcast("documentClick", {$event: e});
	});
	angular.element("body").on("selectstart", function(){
		return false;
	});
}]);