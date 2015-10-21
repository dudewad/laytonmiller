angular.module("LMApp").directive("lm3d", ["$timeout", "LM3dService", "CONSTANTS", function ($timeout, LM3dService, CONSTANTS) {
	return {
		scope: "&",
		restrict: "A",
		link: function (scope, element, attrs) {
			var _lastMouse = null;
			var _lastViewport = LM3dService.getViewport();
			var _traits = {
				percentageX: null,
				percentageY: null
			};
			var _maxAngle = "45";

			function _orient(){
				_updateTraits();
				var mY = _lastMouse.viewport.percentageY;
				var eY = _traits.percentageY;
				var angle = (eY - mY) * _maxAngle;

				element.css("transform", "rotate3d(1, 0, 0, " + angle + "deg)");
			}



			function _mouseMoveHandler(e, data) {
				_lastMouse = data.mouse;
				_orient();
			}



			function _destroyHandler() {
				LM3dService.unregisterInstance(scope);
			}



			function _init() {
				_orient();
			}



			function _updateTraits(){
				var offset = element.offset();
				_traits.percentageX = offset.left + (element.outerWidth() / 2);
				_traits.percentageY = (offset.top - _lastViewport.scrollTop + (element.outerHeight() / 2)) / _lastViewport.height;
			}



			//Register with the LM3d service so it knows to let this instance know when to update
			LM3dService.registerInstance(scope);

			//Register listeners and handlers
			scope.$on("$destroy", _destroyHandler);
			scope.$on(CONSTANTS.EVENT.LM3D.MOUSE_MOVE, _mouseMoveHandler);


			$timeout(function(){
				_init();
			},0);
		}
	};
}]);