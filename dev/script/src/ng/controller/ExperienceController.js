angular.module("LMApp").controller("ExperienceController", ["$scope", "$http", "CONSTANT", "STRINGS", function($scope, $http, CONSTANT, STRINGS){
	$scope.STRINGS = STRINGS.EXPERIENCE;

	$http.get(CONSTANT.PATH.DATA + CONSTANT.DATA_FILES.EXPERIENCE_TIMELINE).
		success(function (data, status, headers, config) {
			for (var i = 0; i < data.events.length; i++) {
				data.events[i].type = "experience";
			}
			$scope.$broadcast(CONSTANT.EVENT.TIMELINE.DATA_RECEIVED, data, $scope.STRINGS.EVENTS);
		}).
		error(function (data, status, headers, config) {
			//TODO: CREATE ERROR HANDLER!!
		});
}]);