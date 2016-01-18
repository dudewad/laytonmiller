angular.module("LMApp").controller("PortfolioController", ["$scope", "$http", "CONSTANT", "STRINGS", function($scope, $http, CONSTANT, STRINGS){
	$scope.STRINGS = STRINGS.PORTFOLIO;

	$http.get(CONSTANT.PATH.DATA + CONSTANT.DATA_FILES.PORTFOLIO_TIMELINE).
	success(function (data, status, headers, config) {
		for (var i = 0; i < data.events.length; i++) {
			data.events[i].type = "portfolio";
		}
		$scope.$broadcast(CONSTANT.EVENT.TIMELINE.DATA_RECEIVED, data, $scope.STRINGS.EVENTS);
	}).
	error(function (data, status, headers, config) {
		//TODO: CREATE ERROR HANDLER!!
	});
}]);