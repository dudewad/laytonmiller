angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "STRINGS", function($rootScope, $scope, STRINGS){
	$scope.currentSection = "default";
	$scope.STRINGS = STRINGS.CORE;

	$rootScope.$on("$stateChangeStart", function(e, toState){
		$scope.currentSection = toState.name;
	});



	angular.element(document).on("click", function(e){
		$rootScope.$broadcast("documentClick", {$event: e});
	});
	angular.element("body").on("selectstart", function(){
		return false;
	});
}]);