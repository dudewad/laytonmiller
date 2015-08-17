angular.module("LMApp").controller("RootController", ["$scope", "$rootScope", function($scope, $rootScope){
	$scope.currentSection = "default";

	$rootScope.$on("$stateChangeStart", function(e, toState){
		$scope.currentSection = toState.name;
	});
}]);