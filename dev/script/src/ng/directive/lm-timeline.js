angular.module("LMApp").directive("lmTimeline", [function () {
	return {
		scope: "=",
		restrict: "A",
		link: function (scope, element, attrs) {
			var decelerationTween = null;
			var slider = null;



			function decelerateTimeline(currentSpeed, event) {
				var duration = Math.abs(currentSpeed / 4);
				var offset = (currentSpeed * 400) + parseInt(slider.css("left"));
				if (offset > 0) {
					offset = 0;
				}
				else if (offset < scope.timeline.position.minX) {
					offset = scope.timeline.position.minX;
				}
				decelerationTween = TweenMax.to(slider, duration, {"left": offset + "px"});
			}



			function applyScope() {
				if (!scope.$$phase) {
					scope.$apply();
				}
			}



			scope.$on("interactionEnd", function (e, pointerData, originalEvent) {
				decelerateTimeline(pointerData.xSpeed, originalEvent);
				applyScope();
			});



			scope.$on("interactionSwipe", function (e, pointerData, originalEvent) {
				var offset = scope.timeline.position.x + pointerData.xDif;
				if (offset > 0) {
					offset = 0;
				}
				else if(offset < scope.timeline.position.minX){
					offset = scope.timeline.position.minX;
				}
				scope.timeline.position.x = offset;
				applyScope();
			});



			scope.$on("interactionStart", function (e, pointerData, originalEvent) {
				var t = scope.timeline;
				/*Get the size of the timeline range so we know what to limit movement to*/
				t.dimensions.width = element.find(".timeline-range").outerWidth();
				t.mask.width = element.outerWidth();
				t.position.minX = parseInt(t.mask.width) - parseInt(t.dimensions.width) - 150;

				if (decelerationTween) {
					decelerationTween.kill();
				}
				t.position.x = parseInt(angular.element(originalEvent.delegateTarget).css("left"));
			});



			scope.$on("timelineBuilt", function(){
				slider = element.find(".timeline-range");
				scope.timeline.dimensions.marginLeft = element.find(".timeline-interval").eq(0).find(".month").outerWidth();
			})
		}
	};
}]);