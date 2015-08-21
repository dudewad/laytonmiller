angular.module("LMApp").controller("TechnicalSummaryController", ["$rootScope", "$scope", "$http", "CONSTANTS",
	function($rootScope, $scope, $http, CONSTANTS, RootController){
		$scope.sectionTitle = "";
		$scope.sectionIntro = "";
		$scope.summaryGroups = null;

		$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.TECHNICAL_SUMMARY).
			success(function (data, status, headers, config) {
				//Recursively loop down to each summaryGroups.summaryItem.skills.tooltipActive property
				for (var summaryGroup in data.summaryGroups) {
					for (var skill in data.summaryGroups[summaryGroup].skills) {
						data.summaryGroups[summaryGroup].skills[skill].tooltipActive = false;
					}
				}

				$scope.sectionTitle = data.sectionTitle;
				$scope.sectionIntro = data.sectionIntro;
				$scope.summaryGroups = data.summaryGroups;
			}).
			error(function (data, status, headers, config) {
				//TODO: CREATE ERROR HANDLER!!
			});
	}]);