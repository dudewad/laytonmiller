angular.module("LMApp").directive("lm3d", ["$timeout", "LM3dService", "CONSTANT", function ($timeout, LM3dService, CONSTANT) {
	return {
		scope: "&",
		restrict: "A",
		link: function (scope, element, attrs) {
			var _lastMouse = null;
			var _lastViewport = LM3dService.getViewport();
			var _traits = {
				centerX: 0,
				centerY: 0,
				percentageZ: -0.1
			};
			var _maxAngle = "45";

			function _orient(){
				if (_lastMouse) {
					_updateTraits();
					var difX = _lastMouse.page.x - _traits.centerX;
					var difY = _lastMouse.page.y - _lastViewport.scrollTop - _traits.centerY;
					var angle = _maxAngle * (Math.sqrt((difX * difX) + (difY * difY)) / _lastViewport.diagonal);

					element.css("transform", "rotate3d(" + -difY + ", " + difX + ", 0, " + angle + "deg)");
				}
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
				_traits.centerX = offset.left + (element.outerWidth() / 2);
				_traits.centerY = offset.top + (element.outerHeight() / 2) - _lastViewport.scrollTop;
			}



			//Register with the LM3d service so it knows to let this instance know when to update
			LM3dService.registerInstance(scope);

			//Register listeners and handlers
			scope.$on("$destroy", _destroyHandler);
			scope.$on(CONSTANT.EVENT.LM3D.MOUSE_MOVE, _mouseMoveHandler);


			$timeout(function(){
				_init();
			},0);
		}
	};
}]);