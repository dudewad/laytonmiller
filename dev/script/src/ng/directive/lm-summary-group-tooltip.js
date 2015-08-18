angular.module("LMApp").directive("lmSummaryGroupTooltip", ["$rootScope", function ($rootScope) {
	return {
		scope: "=",
		restrict: "A",
		link: function (scope, element, attrs) {
			var bodyClickCleanup = $rootScope.$on("bodyClick", bodyClickHandler);



			function toggleTooltip(){
				scope.tooltipActive = !scope.tooltipActive;
				applyScope();
			}



			//When a body click occurs, we need to hide all currently visible tooltips where applicable
			function bodyClickHandler (clickScope, args) {
				console.log("toggles");
				var t = angular.element(args.$event.target);
				var ancestor = t.closest(".summary-item");

				//Get a summary-item. If no item has been clicked, then we de-activate the tooltip
				if (!t.hasClass("summary-item")) {
					if(ancestor.length) {
						t = ancestor;
					}
					else{
						setTooltipInactive();
						return;
					}
				}

				//If a summary item other than "this" one has been clicked, then we de-activate the tooltip.
				if(t.get(0) !== element[0]){
					setTooltipInactive();
				}
				//If "this" one has been clicked, then we toggle the tooltip
				else{
					toggleTooltip();
				}
			}



			function setTooltipInactive(){
				scope.tooltipActive = false;
				applyScope();
			}



			function applyScope(){
				if (!scope.$$phase) {
					scope.$apply();
				}
			}

			element.on('$destroy', function () {
				bodyClickCleanup();
			});
		}
	};
}]);