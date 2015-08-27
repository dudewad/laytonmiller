/**
 * Relies on $rootScope.bodyClick events. If no body click events will fire when the body tag is clicked, this will
 * only partially function.
 *
 * The LMTooltip is designed to designate a "tooltip trigger" element around which the tooltip revolved. Set this
 * directive on the element, and make sure the element contains the tooltip partial, with the proper content. The
 * rest should be handled by styling and Angular magic.
 **/
angular.module("LMApp").directive("lmTooltip", ["$rootScope", function ($rootScope) {
	return {
		scope: "&",
		restrict: "A",
		link: function (scope, element, attrs) {
			var bodyClickCleanup = $rootScope.$on("documentClick", bodyClickHandler);

			function toggleTooltip(){
				scope.tooltipActive = !scope.tooltipActive;
				applyScope();
			}



			//When a body click occurs, we need to hide all currently visible tooltips where applicable
			function bodyClickHandler (clickScope, args) {
				var t = angular.element(args.$event.target);
				var ancestor = t.closest("[data-lm-tooltip]");

				//Get a tooltip-trigger ancestor. If no tooltip-trigger ancestor has been clicked, then we de-activate the tooltip
				if (!t.is("[data-tooltip-trigger]")) {
					if(ancestor.length) {
						t = ancestor;
					}
					else{
						deactivate();
						return;
					}
				}

				//If a tooltip-trigger other than "this" one has been clicked, then we de-activate the tooltip.
				if(t.get(0) !== element[0]){
					deactivate();
				}
				//If "this" one has been clicked, then we toggle the tooltip
				else{
					toggleTooltip();
				}
			}



			function deactivate(){
				scope.tooltipActive = false;
				applyScope();
			}



			function applyScope(){
				if (!scope.$$phase) {
					scope.$apply();
				}
			}

			element.on("$destroy", function () {
				bodyClickCleanup();
			});
		}
	};
}]);