angular.module("LMApp").controller("TimelineController", ["$rootScope", "$scope", "$http", "$timeout", "CONSTANT", "STRINGS", function ($rootScope, $scope, $http, $timeout, CONSTANT, STRINGS) {
	var TIMELINE_STRS = STRINGS.TIMELINE;

	$scope.currentState = {
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
		currentEvent: 0,
		eventActivelyTouched: null
	};




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



	function _applyScope() {
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
		$scope.currentState.pause = true;
	}



	/**
	 * Un-pauses the timeline (un-hide it)
	 *
	 * @private
	 */
	function _unpause(){
		$scope.currentState.pause = false;
	}


	function _destroy() {
		angular.element("body").off("touchstart mousedown", _pointerDownHandler);
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
		_buildTimelineEvents();
		$timeout(function () {
			$scope.$broadcast(CONSTANT.EVENT.TIMELINE.BUILT);
		}, 0);
	});



	$scope.$on(CONSTANT.EVENT.TIMELINE.EVENT_OPENED, function(e){
		_pause();
	});



	$scope.$on(CONSTANT.EVENT.TIMELINE.EVENT_CLOSED, function(){
		_unpause();
	});

	$scope.$on("$destroy", _destroy);



	function _pointerDownHandler(e) {
		if ($(e.target).is(".timeline-event") || $(e.target).closest(".timeline-event").length) {
			return;
		}
		$scope.timeline.eventActivelyTouched = null;
		_applyScope();
	}



	angular.element("body").on("touchstart mousedown", _pointerDownHandler);
}]);