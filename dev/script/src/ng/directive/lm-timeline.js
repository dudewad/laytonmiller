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



			function _init() {
				if(!_pageTransitionComplete || ! _timelineBuilt){
					return;
				}

				_resizeHandlerID = GlobalEventsService.registerResizeHandler(_resizeHandler);
				_enter();
			}



			function _enter() {
				_killSwipeTween();
				var target = element.find(".timeline-event").eq(scope.timeline.currentEvent);
				var center = angular.element(window).outerHeight() / 2 - target.outerHeight() / 2;

				_swipeTargetTween = new TimelineMax();
				_swipeTargetTween.to(target, 2.5, {top: center, ease: Power4.easeOut});
			}



			function _next() {
				scope.timeline.currentEvent++;
				if(scope.timeline.currentEvent === scope.timeline.events.length){
					scope.timeline.currentEvent = 0;
				}
				_enter();
			}



			function _previous() {
				scope.timeline.currentEvent--;
				if (scope.timeline.currentEvent < 0) {
					scope.timeline.currentEvent = scope.timeline.events.length - 1;
				}
				_enter();
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

				_swipeTarget.css({
					top: _positioning.top + "px"
				});
				_applyScope();
			});



			scope.$on("interactionStart", function (e, pointerData, originalEvent) {
				_swipeTarget = $(originalEvent.target).closest(".timeline-event");
				_positioning = {
					top: parseInt(_swipeTarget.css("top"))
				};
			});



			scope.$on("$destroy", function () {
				GlobalEventsService.unregisterResizeHandler(_resizeHandlerID);
			});



			scope.$on(CONSTANT.EVENT.TIMELINE.BUILT, function () {
				_timelineBuilt = true;
				_init();
			});



			scope.$on(CONSTANT.EVENT.PAGE.TRANSITION_COMPLETE, function(){
				_pageTransitionComplete = true;
				_init();
			});
		}
	};
}]);