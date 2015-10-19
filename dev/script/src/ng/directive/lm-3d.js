angular.module("LMApp").directive("lm3d", ["LM3dService", "GlobalEventsService", function (LM3dService, GlobalEventsService) {
	return {
		scope: "&",
		restrict: "A",
		link: function (scope, element, attrs) {
			var _window = angular.element(window);
			var _body = angular.element("body");
			var pendingMouseUpdate = false;
			var resizeHandlerID;
			var viewport = {
				x: null,
				y: null
			};



			function updatePosition(e) {
				pendingMouseUpdate = false;
			}



			function requestMouseMoveCall(e) {
				!pendingMouseUpdate && requestAnimationFrame(function(){
					updatePosition(e);
				});
				pendingMouseUpdate = true;
			}



			function updateViewportStats(){
				var w = _window.width();
				var h = _window.height();

				viewport = {
					width: w,
					height: h,
					centerX: w * 0.5,
					centerY: h * 0.5
				};
			}


			//Register handlers
			_body.on("mousemove", requestMouseMoveCall);
			resizeHandlerID = GlobalEventsService.registerResizeHandler(function(){
				updateViewportStats();
			});
			updateViewportStats();


			scope.$on("$destroy", function(){
				_body.off("mousemove", requestMouseMoveCall);
				GlobalEventsService.unregisterResizeHandler(resizeHandlerID);
				LM3dService.unregisterInstance(scope);
			});

			LM3dService.registerInstance(scope);
		}
	};
}]);