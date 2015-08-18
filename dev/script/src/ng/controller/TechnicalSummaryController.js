angular.module("LMApp").controller("TechnicalSummaryController", ["$rootScope", "$scope", "$http", "CONSTANTS",
	function($rootScope, $scope, $http, CONSTANTS, RootController){
		$scope.sectionTitle = "";
		$scope.sectionIntro = "";
		$scope.summaryGroups = null;

		$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.TECHNICAL_SUMMARY).
			success(function (data, status, headers, config) {
				//Recursively loop down to each summaryGroups.summaryItem.skills.tooltipActive property
				for (var summaryGroup in data["summary-groups"]) {
					for (var skill in data["summary-groups"][summaryGroup].skills) {
						data["summary-groups"][summaryGroup].skills[skill].tooltipActive = false;
					}
				}

				$scope.sectionTitle = data["section-title"];
				$scope.sectionIntro = data["section-intro"];
				$scope.summaryGroups = data["summary-groups"];
			}).
			error(function (data, status, headers, config) {
				//TODO: CREATE ERROR HANDLER!!
			});
	}]);