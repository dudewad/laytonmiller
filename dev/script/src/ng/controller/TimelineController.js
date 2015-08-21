angular.module("LMApp").controller("TimelineController", ["$scope", "$http", "CONSTANTS", function($scope, $http, CONSTANTS){
	$scope.timeline = {
		startDate: {
			date: null,
			asInt: 0
		},
		endDate: {
			date: null,
			asInt: 0
		},
		dateRange: {
			asInt: 0
		},
		intervals: [],
		events:[]
	};



	var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];



	/**
	 * Factory function to return an "Interval" object
	 */
	var Interval = function(labelMonth, labelYear, position){
		return {
			label: {
				month: labelMonth,
				year: labelYear || null
			},
			position: parseFloat(position) + "%"
		}
	};



	function calculateTimeline(){
		var extendedDate;

		//Find the "earliest" date
		for(var evt in $scope.timeline.events){
			var e = $scope.timeline.events[evt];
			if(e.start){
				var d = Date.parse(e.start);
				if(!$scope.timeline.endDate.asInt || d < $scope.timeline.endDate.asInt){
					$scope.timeline.endDate.asInt = d;
				}
			}
		}

		//We now have the date as the first timeline event start date on record. Extend that further back to the
		//beginning of that month for a prettier timeline display.
		extendedDate = new Date($scope.timeline.endDate.asInt);
		extendedDate.setDate(1);

		//Set critical data points
		$scope.timeline.startDate.date = new Date();
		$scope.timeline.startDate.asInt = Date.parse($scope.timeline.startDate.date);
		$scope.timeline.endDate.date = extendedDate;
		$scope.timeline.endDate.asInt = Date.parse(extendedDate);
		$scope.timeline.dateRange.asInt = $scope.timeline.startDate.asInt - $scope.timeline.endDate.asInt;
	}



	function buildTimelineIntervals(){
		var current = new Date($scope.timeline.startDate.date.getFullYear(), $scope.timeline.startDate.date.getMonth(), 1);
		var currentYear = current.getFullYear();

		$scope.timeline.intervals.push(new Interval("Today", currentYear, 0));

		while($scope.timeline.endDate.date < current){
			var d = Date.parse((current.getMonth() + 1) + "/1/" + current.getFullYear());
			var thisRange = d - $scope.timeline.endDate.asInt;
			var year = null;

			if(current.getMonth() === 0){
				year = currentYear = current.getFullYear() - 1;
			}

			$scope.timeline.intervals.push(new Interval(months[current.getMonth()], year, (1 - thisRange / $scope.timeline.dateRange.asInt) * 100));
			current.setMonth(current.getMonth() - 1);
		}

		//Push final month for space
		$scope.timeline.intervals.push(new Interval(months[current.getMonth()], year, 100));

		applyScope();
	}



	function buildTimelineEvents(){
		var events = [];
		for(var evt in $scope.timeline.events){
			var e = $scope.timeline.events[evt];
			var startRange = Date.parse(e.start) - $scope.timeline.endDate.asInt;
			var endRange;

			//There will always be a start position
			e.startPosition = ((1 - startRange / $scope.timeline.dateRange.asInt) * 100) + "%";

			//End position is optional
			if(e.end) {
				//Keyword "current" means this event is always going until "now"
				//Since "end" is present, we have a range and need to calculate for the range line indicator as well
				if(e.end.toLowerCase() === "current"){
					endRange = 0;
					e.endPosition = 0;
				}
				//Otherwise event ends on the timeline.
				else {
					endRange = Date.parse(e.end) - $scope.timeline.endDate.asInt;
					e.endPosition = ((1 - endRange / $scope.timeline.dateRange.asInt) * 100) + "%";
					e.rangeIndicator = ((endRange - startRange) / $scope.timeline.dateRange.asInt * 100) + "%";
				}

			}

			e.tooltipContent = e.name + ": " + e.start + " to " + e.end;
		}
	}



	function applyScope() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}



	$scope.$on("timelineData", function(e, data){
		if(!data || !Array.isArray(data.events)){
			//TODO: Handle error here or in broadcaster? Here would be better since this IS the timeline and you dont
			//want to have to implement a handler in every broadcaster...
			return false;
		}

		$scope.timeline.events = data.events;
		calculateTimeline();
		buildTimelineIntervals();
		buildTimelineEvents();
	});
}]);