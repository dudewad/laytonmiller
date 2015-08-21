angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", function($rootScope, $scope){
	$scope.currentSection = "default";



	$rootScope.$on("$stateChangeStart", function(e, toState){
		$scope.currentSection = toState.name;
	});



	angular.element(document).on("click", function(e){
		$rootScope.$broadcast("documentClick", {$event: e});
	});
}]);