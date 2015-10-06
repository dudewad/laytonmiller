angular.module("LMApp").directive("lmPageBackground", ["CONSTANTS", "GlobalEventsService", "BreakpointService", "AnimationService", function (CONSTANTS, GlobalEventsService, BreakpointService, AnimationService) {
	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			var _toState;
			var _fromState;
			var _body = angular.element("body");
			var _window = angular.element(window);
			var docHeight;
			var viewportHeight;
			var scrollableHeight;

			scope.registerTransitionHandler(transition);
			GlobalEventsService.registerScrollHandler(scrollHandler);
			GlobalEventsService.registerResizeHandler(resizeHandler);


			function transition(toState, fromState) {
				var slots;
				var slotsWidth;
				var bp = BreakpointService.getCurrentBreakpoint().toLowerCase();
				var img = $("<img>");
				var path = CONSTANTS.PATH.BACKGROUND_IMAGE + toState.name + "/" + bp + ".jpg";
				var windowW = _window.width();
				element.show();

				_toState = toState;
				_fromState = fromState;

				switch (bp) {
					case "xs":
						slots = 6;
						break;
					case "sm":
						slots = 6;
						break;
					case "md":
						slots = 8;
						break;
					case "lg":
						slots = 10;
						break;
					case "xl":
						slots = 12;
						break;
					default:
						slots = 4;
						break;
				}

				slotsWidth = 100 / slots;
				element.html("");

				for (var i = 0; i < slots; i++) {
					var d = $("<div><span></span></div>").css({
						"width": slotsWidth + "%"
					});
					var s = d.find("span");
					element.append(d);
					//Using pixels gives more precision than percentages
					s.css({
						"left": (-d.offset().left) + "px",
						"width": windowW
					});
				}

				img.on("load", animateTransition);
				img.attr("src", path);
			}



			function animateTransition() {
				setTransitionState(_toState.name);
				var t = new TimelineMax({
					paused: true,
					onComplete: function () {
						scope.$emit(CONSTANTS.EVENT.ANIMATION.PAGE_TRANSITION_COMPLETE, _toState, _fromState);
						setSection(_toState.name);
						element.html("");
						setTransitionState();
					}
				});

				t   .add("start")
					.add(AnimationService.transition.pageBackground(element, 0.75, "start", 0, 1.5));
				t.play();
			}



			function setSection(section){
				scope.section = section;
				applyScope();
			}



			function setTransitionState(state){
				scope.transitionState = state && "transition-to-" + state || undefined;
				applyScope();
			}



			function scrollHandler(e){
				docHeight = _body.outerHeight();
				scrollableHeight = docHeight - viewportHeight;
				var bottom = _window.scrollTop() + viewportHeight;
				var percent = 1 - ((docHeight - bottom) / scrollableHeight);
				element.css("top", -15 * percent + "%");
			}



			function resizeHandler(){
				viewportHeight = _window.height();
				docHeight = _body.outerHeight();
				scrollableHeight = docHeight - viewportHeight;
			}



			/**
			 * Performs a forced apply scope call in a safe manner.
			 */
			function applyScope() {
				if (!scope.$$phase) {
					scope.$apply();
				}
			}

			resizeHandler();
		}
	};
}]);