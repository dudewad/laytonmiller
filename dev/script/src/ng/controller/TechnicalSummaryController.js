angular.module("LMApp").controller("TechnicalSummaryController", ["$rootScope", "$scope", "$http", "$sce", "CONSTANT", "STRINGS",
	function($rootScope, $scope, $http, $sce, CONSTANT, STRINGS){
		$scope.STRINGS = STRINGS.TECHNICAL_SUMMARY;
		$scope.sectionTitle = $scope.STRINGS.HEADER.TITLE;
		$scope.sectionIntro = $sce.trustAsHtml($scope.STRINGS.HEADER.DESCRIPTION);
		$scope.summaryGroups = null;
		$scope.key = $scope.STRINGS.KEY;
		var _loadedData;


		$scope.$on(CONSTANT.EVENT.PAGE.TRANSITION_OUT_COMPLETE, function () {
			var GROUPSTRINGS = $scope.STRINGS.SUMMARY_GROUPS;
			var parsedSummaryGroups = [];
			//Parse returned data, and add string values to accompanying data points.
			for (var g in _loadedData.summaryGroups) {
				var group = _loadedData.summaryGroups[g];
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
		});

		$http.get(CONSTANT.PATH.DATA + CONSTANT.DATA_FILES.TECHNICAL_SUMMARY).
			success(function (data, status, headers, config) {
				_loadedData = data;
			}).
			error(function (data, status, headers, config) {
				//TODO: CREATE ERROR HANDLER!!
			});
	}]);