angular.module("LMApp").directive("lmTimeline", ["CONSTANT", "LMRoute", "GlobalEventsService", function (CONSTANT, LMRoute, GlobalEventsService) {
	return {
		scope: "=",
		restrict: "A",
		link: function (scope, element, attrs) {
			//Config
			var _acceleration = 50;
			var _defaultTransitionTime = 2;

			//Local Constants
			var _direction = {
				next: "next",
				prev: "prev"
			};

			//DOM elements
			var _swipeTarget;
			var _cta;
			var _month;
			var _year;

			//Cache
			var _positioning = {};
			var _resizeHandlerID;
			var _currentTimelineTime = {
				currentMonthCount: 23836
			};
			var _sref;

			//Flags
			var _mouseWheelTransition = false;
			var _isFirstTouch;

			//Animation
			var _swipeTargetTween;
			var _outTween;



			function _init() {
				_cta = element.find(".cta");
				_month = element.find(".month");
				_year = element.find(".year");
				_resizeHandlerID = GlobalEventsService.registerResizeHandler(_resizeHandler);
				scope.isSwiping = false;
				angular.element("body").on("mousewheel", _handleMouseWheel);
				_enter(_direction.next);
			}



			function _enter(dir) {
				if(!dir){
					return;
				}
				_killSwipeTween();
				var target = element.find(".timeline-event").eq(scope.timeline.currentEvent);
				var center = angular.element(window).outerHeight() / 2 - target.outerHeight() / 2;
				var topPos = dir === _direction.next ? "100%" : "-" + target.outerHeight();
				var date = new Date(scope.timeline.events[scope.timeline.currentEvent].start);
				var month = (date.getMonth());
				var year = date.getFullYear() * 12;
				var newMonthCount = year + month;
				var dateTween = new TimelineMax({
					onComplete: function () {
						_currentTimelineTime.currentMonthCount = newMonthCount;
					}
				});

				dateTween.to(_currentTimelineTime, _defaultTransitionTime, {currentMonthCount: newMonthCount, onUpdate: _updateDateDisplay});

				_swipeTargetTween = new TimelineMax();
				_swipeTargetTween   .set(target, {top: topPos})
									.add("start")
									.add(dateTween)
									.to(target, _defaultTransitionTime, {top: center, ease: Power4.easeOut}, "start");

				_updateDateDisplay();
			}



			function _exit(dir) {
				if(!dir){
					return;
				}
				_killSwipeTween();
				var target = element.find(".timeline-event").eq(scope.timeline.currentEvent);
				var topPos = dir !== _direction.next ? "100%" : "-" + target.outerHeight();
				_outTween = new TimelineMax();
				_outTween.to(target, _defaultTransitionTime, {top: topPos, ease: Power4.easeOut});
			}



			function _playTimelineHint(){
				var t = new TimelineMax({
					repeat: -1,
					yoyo: true
				});
				var target = $("[data-anim-arrow]");

				t.to(target, 0.65, {top:"+=.25em", ease: Power2.easeInOut});
			}



			scope.confirmTimelineHint = function(){
				scope.flags.confirmedTimelineHint = true;
				_init();
			};



			function _abortSwipe(){
				_killSwipeTween();

				var target = element.find(".timeline-event").eq(scope.timeline.currentEvent);
				var center = angular.element(window).outerHeight() / 2 - target.outerHeight() / 2;

				_swipeTargetTween = new TimelineMax();
				_swipeTargetTween.to(target, _defaultTransitionTime, {top: center, ease: Power4.easeOut});
			}



			function _next() {
				scope.timeline.currentEvent++;
				if(scope.timeline.currentEvent === scope.timeline.events.length){
					scope.timeline.currentEvent = 0;
				}
				_enter(_direction.next);
			}



			function _previous() {
				scope.timeline.currentEvent--;
				if (scope.timeline.currentEvent < 0) {
					scope.timeline.currentEvent = scope.timeline.events.length - 1;
				}
				_enter(_direction.prev);
			}



			function _killSwipeTween(){
				_swipeTargetTween && _swipeTargetTween.kill && _swipeTargetTween.kill();
			}



			function _resizeHandler(){
				//Abort will re-vertically-center the currently visible event item
				_abortSwipe();
			}



			function _updateDateDisplay(){
				var m = Math.floor(_currentTimelineTime.currentMonthCount % 12 + 1);
				var y = Math.floor(_currentTimelineTime.currentMonthCount / 12);
				//Leading zeros in the display
				if(m.toString().length === 1){
					m = "0" + m;
				}
				scope.eventMonth = m;
				scope.eventYear = y;
				_applyScope();
			}



			function _applyScope() {
				if (!scope.$$phase) {
					scope.$apply();
				}
			}



			function _willStopOffScreen(distance){
				var currentY = _swipeTarget.offset().top;
				if(distance > 0){
					return currentY + distance > angular.element(window).outerHeight();
				}
				else{
					return currentY + _swipeTarget.outerHeight() + distance < 0;
				}
			}



			function _updateSwipeTarget(){
				_swipeTarget.css({
					top: _positioning.top + "px"
				});
			}



			function _handleMouseWheel(e){
				if(_mouseWheelTransition || scope.currentState.pause){
					return;
				}
				var target = element.find(".timeline-event").eq(scope.timeline.currentEvent);
				var posTop = e.originalEvent.deltaY > 0 ? "100%" : "-" + target.outerHeight() + "px";
				var t = new TimelineMax({
					onComplete: function(){
						_mouseWheelTransition = false;
					}
				});
				t.to(target, _defaultTransitionTime / 2, {top: posTop});
				if(e.originalEvent.deltaY > 0){
					_previous();
				}
				else{
					_next();
				}
				_mouseWheelTransition = true;
			}



			scope.toEventSummary = function(index){
				var dir;

				if(index === scope.timeline.currentEvent){
					return;
				}
				else if(index < scope.timeline.currentEvent){
					dir = _direction.prev;
				}
				else{
					dir = _direction.next;
				}
				_exit(dir);
				scope.timeline.currentEvent = index;
				_enter(dir);
			};



			scope.$on("interactionSwipe", function (e, pointerData, originalEvent) {
				scope.isSwiping = true;
				_positioning = {
					top: _positioning.top + pointerData.yDif
				};
				_updateSwipeTarget();
				_applyScope();
			});



			scope.$on("interactionStart", function (e, pointerData, originalEvent) {
				_killSwipeTween();
				_swipeTarget = $(originalEvent.target).closest(".timeline-event");

				if (originalEvent.type.toLowerCase().indexOf("touch") !== -1) {
					_isFirstTouch = !_swipeTarget.is(".active");
					scope.timeline.eventActivelyTouched = scope.timeline.currentEvent;
				}
				_sref = _swipeTarget.data("timeline-sref");

				_positioning = {
					top: parseInt(_swipeTarget.css("top"))
				};
			});



			scope.$on("interactionEnd", function (e, pointerData, originalEvent) {
				_positioning = {};
				var speed = pointerData.ySpeed * 250;
				//Time = vf - vi / acceleration
				var time = Math.abs(-speed / _acceleration);
				//Distance = (vi * t) + (1/2 * a * t^2)
				var distance = speed * time + 0.5 * _acceleration * time * time; //time * time is faster than Math.pow

				//Return to center if it's not going to be far enough to put it off screen
				if (!_willStopOffScreen(distance)) {
					if(scope.isSwiping){
						_abortSwipe();
					}
					else if (!_isFirstTouch || _swipeTarget.is(":hover")) {
						LMRoute.go(_sref);
					}
				}
				else if (!scope.isSwiping) {
					return;
				}
				else {
					var t = new TimelineMax();
					t.to(_swipeTarget, time, {top: "+=" + distance + "px"});
					if (distance > 0) {
						_previous();
					}
					else {
						_next();
					}
				}
				scope.isSwiping = false;
				_applyScope();
			});



			scope.$on("$destroy", function () {
				GlobalEventsService.unregisterResizeHandler(_resizeHandlerID);
				angular.element("body").off("mousewheel", _handleMouseWheel);
			});



			scope.$on(CONSTANT.EVENT.PAGE.TRANSITION_OUT_COMPLETE, function(){
				if(scope.flags.confirmedTimelineHint) {
					_init();
				}
				else{
					_playTimelineHint();
				}
			});
		}
	};
}]);