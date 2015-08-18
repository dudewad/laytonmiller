angular.module("LMApp").controller("TechnicalSummaryController", ["$scope", "$http", "CONSTANTS", function($scope, $http, CONSTANTS){
	$scope.sectionTitle = "";
	$scope.sectionIntro = "";
	$scope.summaryGroups = null;

	$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.TECHNICAL_SUMMARY).
		success(function (data, status, headers, config) {
			$scope.sectionTitle = data["section-title"];
			$scope.sectionIntro = data["section-intro"];
			$scope.summaryGroups = data["summary-groups"];
		}).
		error(function (data, status, headers, config) {
			//TODO: CREATE ERROR HANDLER!!
		});
}]);