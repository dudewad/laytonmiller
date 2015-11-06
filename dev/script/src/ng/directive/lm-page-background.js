angular.module("LMApp").directive("lmPageBackground", ["CONSTANT", "GlobalEventsService", "BreakpointService", "AnimationService", function (CONSTANT, GlobalEventsService, BreakpointService, AnimationService) {
	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			var _toState;
			var _fromState;
			var _window = angular.element(window);
			var _document = angular.element(document);
			var viewportHeight;
			var scrollableHeight;

			scope.registerTransitionHandler(transition);
			GlobalEventsService.registerScrollHandler(scrollHandler);
			GlobalEventsService.registerResizeHandler(resizeHandler);


			function transition(promise, toState, fromState) {
				var slots;
				var slotWidth;
				var finalSlotWidth;
				var bp = BreakpointService.getCurrentBreakpoint().toLowerCase();
				var img = $("<img>");
				var path = CONSTANT.PATH.BACKGROUND_IMAGE + toState.name + "/" + bp + ".jpg";
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

				//Needs to use Math.ceil. Sub-pixels unfortunately will cause background to show through on most screen
				//sizes and that's horribly ugly.
				slotWidth = Math.ceil(100 / slots / 100 * windowW);
				finalSlotWidth = windowW - (slotWidth * (slots - 1));
				element.html("");

				for (var i = 0; i < slots; i++) {
					var w = (i == slots - 1) ? finalSlotWidth : slotWidth;
					var d = $("<div><span></span></div>").css({
						"width": w + "px"
					});

					var s = d.find("span");
					element.append(d);
					element.outerHeight();
					//Using pixels gives more precision than percentages
					s.css({
						"left": (-d.offset().left) + "px",
						"width": windowW
					});
				}

				img.on("load", function(){
					animateTransition(promise);
				});
				img.attr("src", path);
			}


			/**
			 * Animate the page transition. Since the root controller needs to know when this is completed, we need to
			 * resolve the promise that was provided when the transition began.
			 *
			 * @param completePromise
			 */
			function animateTransition(completePromise) {
				setTransitionState(_toState.name);
				var t = new TimelineMax({
					paused: true,
					onComplete: function () {
						setSection(_toState.name);
						element.html("");
						setTransitionState();
						//All done, resolve the promise back to root
						completePromise.resolve();
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
				viewportHeight = _window.height();
				scrollableHeight = _document.height() - viewportHeight;
				var percent = (_window.scrollTop() / scrollableHeight);
				element.css("top", -15 * percent + "%");
			}



			function resizeHandler(){
				viewportHeight = _window.height();
				scrollableHeight = _document.outerHeight() - viewportHeight;
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