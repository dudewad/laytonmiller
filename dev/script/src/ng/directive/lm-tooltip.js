/**
 * The LMTooltip is designed to designate a "tooltip trigger" element around which the tooltip revolved. Set this
 * directive on the element, and make sure the element contains the tooltip partial, with the proper content. The
 * rest should be handled by styling and Angular magic.
 **/
angular.module("LMApp").directive("lmTooltip", [function () {
	return {
		scope: "&",
		restrict: "A",
		link: function (scope, element, attrs) {

			//Tracks the timestamp of an event to distinguish between click events due to bubbling issues created by
			//when listeners are added to the document element
			var clickID = null;



			/**
			 * Changes active state of the tooltip and then applies scope to update the view.
			 * If the tooltip is active, it adds a body listener to deactivate the tooltip when the document is clicked
			 * elsewhere. Otherwise, it removes said listener.
			 *
			 * @param e     {object}    The click event triggering this method
			 */
			function toggleTooltip(e){
				scope.tooltipActive = !scope.tooltipActive;
				applyScope();

				if (scope.tooltipActive) {
					addBodyListener(e.timeStamp);
				}
				else {
					removeBodyListener();
				}
			}



			/**
			 * Deactivates the tooltip based off a click event on the document other than clicks on the tooltip element
			 * itself. Requires an event with a timestamp, because the body listener is attached by the original toggle
			 * call which, due to bubbling, is added before the original click event reaches the document root meaning
			 * that it would be called two times. Comparing the timestamp on the click event is sufficient to mitigate.
			 *
			 * @param e     {object}    The click event triggering this method
			 */
			function deactivate(e){
				if(e.timeStamp !== clickID){
					scope.tooltipActive = false;
					applyScope();
				}
			}



			/**
			 * Add the listener and set the local timestamp for the click event so that the deactivate() method can
			 * distinguish between the original triggering click and a new click. Read the deactivate() method for more.
			 *
			 * @param timestamp
			 */
			function addBodyListener(timestamp){
				clickID = timestamp;
				angular.element(document).on("click", deactivate);
			}



			/**
			 * Remove the listener that was applied by addBodyListener().
			 */
			function removeBodyListener(){
				angular.element(document).off("click", deactivate);
			}



			/**
			 * Performs a forced apply scope call in a safe manner.
			 */
			function applyScope() {
				if (!scope.$$phase) {
					scope.$apply();
				}
			}



			//Bootstrap the directive
			element.on("click", toggleTooltip);
			element.on("$destroy", removeBodyListener);
		}
	};
}]);