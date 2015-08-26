angular.module("LMApp").controller("TechnicalSummaryController", ["$rootScope", "$scope", "$http", "CONSTANTS", "STRINGS",
	function($rootScope, $scope, $http, CONSTANTS, STRINGS){
		$scope.STRINGS = STRINGS.TECHNICAL_SUMMARY;
		$scope.sectionTitle = $scope.STRINGS.HEADER.TITLE;
		$scope.sectionIntro = $scope.STRINGS.HEADER.DESCRIPTION;
		$scope.summaryGroups = null;

		$http.get(CONSTANTS.PATH.DATA + CONSTANTS.DATA_FILES.TECHNICAL_SUMMARY).
			success(function (data, status, headers, config) {
				var GROUPSTRINGS = $scope.STRINGS.SUMMARY_GROUPS;
				var parsedSummaryGroups = [];
				//Parse returned data, and add string values to accompanying data points.
				for (var g in data.summaryGroups) {
					var group = data.summaryGroups[g];
					var summaryGroup = {
						title: GROUPSTRINGS[g].TITLE,
						skills: []
					};

					for (var skill in group) {
						var s = {};
						var strObj = $scope.STRINGS.SUMMARY_GROUPS[g].ITEMS[skill];
						s.name = strObj.NAME;
						s.rating = group[skill];
						s.tooltipContent = strObj.TOOLTIP;
						s.tooltipActive = false;
						summaryGroup.skills.push(s);
					}

					parsedSummaryGroups.push(summaryGroup);
				}
				$scope.summaryGroups = parsedSummaryGroups;
			}).
			error(function (data, status, headers, config) {
				//TODO: CREATE ERROR HANDLER!!
			});
	}]);