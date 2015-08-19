angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", function($rootScope, $scope){
	$scope.currentSection = "default";

	FastClick.attach(document.body);



	$rootScope.$on("$stateChangeStart", function(e, toState){
		$scope.currentSection = toState.name;
	});



	angular.element("body").on("click", function(e){
		$rootScope.$broadcast("bodyClick", {$event: e});
	});
}]);