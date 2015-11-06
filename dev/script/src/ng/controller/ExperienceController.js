angular.module("LMApp").controller("ExperienceController", ["$scope", "$http", "CONSTANT", "STRINGS", function($scope, $http, CONSTANT, STRINGS){
	$scope.STRINGS = STRINGS.EXPERIENCE;
	$scope.sectionTitle = $scope.STRINGS.HEADER.TITLE;
	$scope.sectionIntro = $scope.STRINGS.HEADER.DESCRIPTION;

	$http.get(CONSTANT.PATH.DATA + CONSTANT.DATA_FILES.EXPERIENCE_TIMELINE).
		success(function (data, status, headers, config) {
			$scope.$broadcast("timelineData", data, $scope.STRINGS.EVENTS);
		}).
		error(function (data, status, headers, config) {
			//TODO: CREATE ERROR HANDLER!!
		});
}]);