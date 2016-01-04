angular.module("LMApp").directive("lmTimeline", ["CONSTANT", "GlobalEventsService", function (CONSTANT, GlobalEventsService) {
	return {
		scope: "=",
		restrict: "A",
		link: function (scope, element, attrs) {
			var _swipeTarget = null;
			var _swipeTargetTween = null;
			var _positioning = {};
			var _hasClickCancel = null;
			var _resizeHandlerID;
			var _pageTransitionComplete = false;
			var _timelineBuilt = false;
			var _acceleration = 50;
			var _defaultTransitionTime = 2;
			var _mouseWheelTransition = false;
			var _direction = {
				next: "next",
				prev: "prev"
			};



			function _init() {
				if(!_pageTransitionComplete || ! _timelineBuilt){
					return;
				}

				_resizeHandlerID = GlobalEventsService.registerResizeHandler(_resizeHandler);
				_enter();
			}



			function _enter(dir) {
				dir = dir ? dir : _direction.next;
				_killSwipeTween();
				var target = element.find(".timeline-event").eq(scope.timeline.currentEvent);
				var center = angular.element(window).outerHeight() / 2 - target.outerHeight() / 2;
				var topPos = dir === _direction.next ? "100%" : "-" + target.outerHeight();

				_swipeTargetTween = new TimelineMax();
				_swipeTargetTween   .set(target, {top: topPos})
									.to(target, _defaultTransitionTime, {top: center, ease: Power4.easeOut});

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
				//console.log("swipe target offset",_swipeTarget.offset());
				if(distance > 0){
					//console.log(angular.element(window).outerHeight(), currentY + distance, currentY, distance);
					return currentY + distance > angular.element(window).outerHeight();
				}
				else{
					//console.log(currentY + _swipeTarget.outerHeight() + distance, currentY, _swipeTarget.outerHeight(), distance);
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
		}
	};
}]);