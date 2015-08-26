angular.module("LMApp").controller("ExperienceController", ["$scope", "$http", "CONSTANTS", "STRINGS", function($scope, $http, CONSTANTS, STRINGS){
	$scope.STRINGS = STRINGS.EXPERIENCE;
	$scope.sectionTitle = $scope.STRINGS.HEADER.TITLE;
	$scope.sectionIntro = $scope.STRINGS.HEADER.DESCRIPTION;

	$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.EXPERIENCE_TIMELINE).
		success(function (data, status, headers, config) {
			$scope.$broadcast("timelineData", data, $scope.STRINGS.EVENTS);
		}).
		error(function (data, status, headers, config) {
			//TODO: CREATE ERROR HANDLER!!
		});
}]);