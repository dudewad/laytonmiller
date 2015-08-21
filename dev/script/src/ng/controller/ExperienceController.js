angular.module("LMApp").controller("ExperienceController", ["$scope", "$http", "CONSTANTS", function($scope, $http, CONSTANTS){
	$scope.sectionTitle = "";
	$scope.sectionIntro = "";



	$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.EXPERIENCE).
		success(function (data, status, headers, config) {
			$scope.sectionTitle = data.sectionTitle;
			$scope.sectionIntro = data.sectionIntro;
		}).
		error(function (data, status, headers, config) {
			//TODO: CREATE ERROR HANDLER!!
		});

	$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.EXPERIENCE_TIMELINE).
		success(function (data, status, headers, config) {
			$scope.$broadcast("timelineData", data);
		}).
		error(function (data, status, headers, config) {
			//TODO: CREATE ERROR HANDLER!!
		});
}]);