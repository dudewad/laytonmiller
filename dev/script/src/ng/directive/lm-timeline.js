angular.module("LMApp").directive("lmTimeline", ["CONSTANT", "GlobalEventsService", function (CONSTANT, GlobalEventsService) {
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

			//Flags
			var _hasClickCancel = false;
			var _mouseWheelTransition = false;
			var _pageTransitionComplete = false;
			var _timelineBuilt = false;

			//Animation
			var _ctaAnimationTween;
			var _swipeTargetTween;



			function _init() {
				if(!_pageTransitionComplete || !_timelineBuilt){
					return;
				}

				_cta = element.find(".cta");
				_month = element.find(".counter .month");
				_year = element.find(".counter .year");
				_resizeHandlerID = GlobalEventsService.registerResizeHandler(_resizeHandler);
				_enter();
			}



			function _enter(dir) {
				dir = dir ? dir : _direction.next;
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


				_prevEvent = scope.timeline.currentEvent;
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



			function _clickCancel(e){
				e.preventDefault();
				_hasClickCancel = false;
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



			scope.$on("interactionEnd", function (e, pointerData, originalEvent) {
				_positioning = {};
				var speed = pointerData.ySpeed * 250;
				//Time = vf - vi / acceleration
				var time = Math.abs(-speed / _acceleration);
				//Distance = (vi * t) + (1/2 * a * t^2)
				var distance = speed * time + 0.5 * _acceleration * time * time;

				/*_swipeTarget.find("a").off("click", _clickCancel);
				 _hasClickCancel = false;*/
				//Return to center if it's not going to be far enough to put it off screen
				if(!_willStopOffScreen(distance)){
					_enter();
				}
				else{
					var t = new TimelineMax();
					t.to(_swipeTarget, time, {top: "+=" + distance + "px"});
					if(distance > 0){
						_previous();
					}
					else{
						_next();
					}
				}
				_applyScope();
			});



			function _handleMouseWheel(e){
				if(_mouseWheelTransition){
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



			function _animateCTAStart(){
				_ctaAnimationTween.kill();
				_ctaAnimationTween = new TimelineMax({repeat: -1, repeatDelay: 0.5});
				_ctaAnimationTween  .set(_cta, {autoAlpha:0, left:"-=15px"})
									.to(_cta, 0.25, {ease: Power4.easeIn, autoAlpha:1, left: "+=15px"})
									.to(_cta, 0.25, {ease: Power4.easeOut, autoAlpha: 0, left: "+=15px"})
									.set(_cta, {autoAlpha: 0, left: "-=30px"});
			}



			function _animateCTAStop() {

			}



			scope.$on("interactionSwipe", function (e, pointerData, originalEvent) {
				if(!_hasClickCancel){
					var anchor = _swipeTarget.find("a");
					//Remove any previously hanging-around instances of the call
					anchor.off("click", _clickCancel);
					anchor.one("click", _clickCancel);
					_hasClickCancel = true;
				}
				_positioning = {
					top: _positioning.top + pointerData.yDif
				};
				_updateSwipeTarget();
				_applyScope();
			});



			scope.$on("interactionStart", function (e, pointerData, originalEvent) {
				_killSwipeTween();
				_swipeTarget = $(originalEvent.target).closest(".timeline-event");
				_positioning = {
					top: parseInt(_swipeTarget.css("top"))
				};
			});



			scope.$on("$destroy", function () {
				GlobalEventsService.unregisterResizeHandler(_resizeHandlerID);
				angular.element("body").off("mousewheel", _handleMouseWheel);
			});



			scope.$on(CONSTANT.EVENT.TIMELINE.BUILT, function () {
				_timelineBuilt = true;
				_init();
			});



			scope.$on(CONSTANT.EVENT.PAGE.TRANSITION_COMPLETE, function(){
				_pageTransitionComplete = true;
				_init();
			});



			angular.element("body").on("mousewheel", _handleMouseWheel);
			element.on("mouseenter", _animateCTAStart);
		}
	};
}]);