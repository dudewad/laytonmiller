angular.module("LMApp").controller("TimelineController", ["$rootScope", "$scope", "$http", "$timeout", "CONSTANT", "STRINGS", function ($rootScope, $scope, $http, $timeout, CONSTANT, STRINGS) {
	var TIMELINE_STRS = STRINGS.TIMELINE;

	$scope.state = {
		pause: false
	};

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
		events: [],
		position: {
			x: 0,
			minX: 0
		},
		dimensions: {
			width: 0,
			marginLeft: 0
		},
		mask: {
			width: 0
		},
		currentEvent: 0
	};



	/**
	 * Factory function to return an "Interval" object
	 */
	/*var Interval = function(labelMonth, labelYear, position){
	 return {
	 label: {
	 month: labelMonth,
	 year: labelYear || null
	 },
	 position: parseFloat(position) + "%"
	 };
	 };*/



	/**
	 * Loop through timeline data and calculate critical data points such as length, date range, etc.
	 */
	/*function calculateTimeline(){
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
	 }*/


	/**
	 * Build timeline intervals
	 */
	/*function buildTimelineIntervals(){
	 var current = new Date($scope.timeline.startDate.date.getFullYear(), $scope.timeline.startDate.date.getMonth(), 1);
	 var currentYear = current.getFullYear();
	 var year = null;
	 var month = null;

	 $scope.timeline.intervals.push(new Interval(TIMELINE_STRS.TODAY, null, 0));

	 while($scope.timeline.endDate.date < current){
	 var d = Date.parse((current.getMonth() + 1) + "/1/" + current.getFullYear());
	 var thisRange = d - $scope.timeline.endDate.asInt;
	 month = TIMELINE_STRS.MONTHS[current.getMonth()].substr(0,3);
	 year = null;

	 if(current.getMonth() === 0){
	 year = currentYear = current.getFullYear();
	 }

	 $scope.timeline.intervals.push(new Interval(month, year, (1 - thisRange / $scope.timeline.dateRange.asInt) * 100));
	 current.setMonth(current.getMonth() - 1);
	 }

	 //Push final month for space
	 month = TIMELINE_STRS.MONTHS[current.getMonth()].substr(0, 3);
	 $scope.timeline.intervals.push(new Interval(TIMELINE_STRS.MONTHS[current.getMonth()], year, 100));
	 }*/



	/**
	 * Build all events for the timeline. Operates directly on the $scope.timeline.events array.
	 * This means modifying the incoming data objects to be assigned the proper strings from the strings constants file.
	 */
	function _buildTimelineEvents() {
		var eStrings = $scope.timeline.eventStrings;
		_sortTimelineEvents();

		//Updates all event objects in the array to have correct property values from loc strings
		for (var i = 0; i < $scope.timeline.events.length; i++) {
			var e = $scope.timeline.events[i];
			var startDateString = (new Date(e.start)).getFullYear();
			var endDateString;
			var d;
			if (e.end.toLowerCase() === "current") {
				d = new Date();
				endDateString = d.getFullYear();
			}
			else {
				endDateString = (new Date(e.end)).getFullYear();
			}

			e.label = eStrings[e.stringId].LABEL;
			e.sublabel = eStrings[e.stringId].SUBLABEL;
			e.dateString = startDateString + " - " + endDateString;
		}
	}



	function applyScope() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}



	/**
	 * Sort timeline events from newest to oldest
	 *
	 * @private
	 */
	function _sortTimelineEvents() {
		$scope.timeline.events.sort(function (a, b) {
			var aStart = Date.parse(a.start);
			var bStart = Date.parse(b.start);

			if (aStart < bStart) {
				return 1;
			}
			if (aStart > bStart) {
				return -1;
			}
			return 0;
		});
	}



	/**
	 * Pauses the timeline (hide it)
	 *
	 * @private
	 */
	function _pause(){
		$scope.state.pause = true;
	}



	/**
	 * Un-pauses the timeline (un-hide it)
	 *
	 * @private
	 */
	function _unpause(){
		$scope.state.pause = false;
	}



	function _displayUIHelper(){

	}



	$scope.dragHandler = function (pointerData, event) {
		switch (event.type) {
			case "mousedown":
			case "touchstart":
				$scope.$broadcast("interactionStart", pointerData, event);
				break;
			case "mousemove":
			case "touchmove":
				$scope.$broadcast("interactionSwipe", pointerData, event);
				break;
			case "mouseup":
			case "touchend":
				$scope.$broadcast("interactionEnd", pointerData, event);
				break;
		}
	};



	$scope.$on(CONSTANT.EVENT.TIMELINE.DATA_RECEIVED, function (e, data, eventStrings) {
		if (!data || !Array.isArray(data.events)) {
			//TODO: Handle error here or in broadcaster? Here would be better since this IS the timeline and you dont
			//want to have to implement a handler in every broadcaster...
			return false;
		}

		$scope.timeline.events = data.events;
		$scope.timeline.eventStrings = eventStrings;
		//calculateTimeline();
		//buildTimelineIntervals();
		_buildTimelineEvents();
		$timeout(function () {
			$scope.$broadcast(CONSTANT.EVENT.TIMELINE.BUILT);
		}, 0);
	});



	$scope.$on(CONSTANT.EVENT.TIMELINE.EVENT_OPENED, function(){
		_pause();
	});



	$scope.$on(CONSTANT.EVENT.TIMELINE.EVENT_CLOSED, function(){
		_unpause();
	});
}]);