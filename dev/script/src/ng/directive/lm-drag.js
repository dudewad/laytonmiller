angular.module("LMApp").directive("lmDrag", ["GlobalEventsService", function (GlobalEventsService) {
	return {
		scope: {
			lmDrag: "&"
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			var body = angular.element("body");
			var lastX = null;
			var lastY = null;
			var lastTimestamp = null;
			var lastPointerData = null;
			var pointerListenerID;

			/*Support handlers to each bound listener that is triggered when the user touches/mousedowns*/
			function touchEndFn (e) {
				GlobalEventsService.unregisterPointerMoveHandler(pointerListenerID);
				pointerListenerID = null;
				body.off("touchend", touchEndFn);
				handler(e);
				resetPointer();
			}

			function mouseUpFn (e) {
				GlobalEventsService.unregisterPointerMoveHandler(pointerListenerID);
				pointerListenerID = null;
				body.off("mouseup", mouseUpFn);
				handler(e);
				resetPointer();
			}

			/*Bind Mousedown/touchstart events*/
			elm.on("touchstart", function (e) {
				pointerListenerID = GlobalEventsService.registerPointerMoveHandler(handler);
				body.on("touchend", touchEndFn);
				handler(e);
			});

			elm.on("mousedown", function (e) {
				pointerListenerID = GlobalEventsService.registerPointerMoveHandler(handler);
				body.on("mouseup", mouseUpFn);
				handler(e);
			});



			function handler(e) {
				if(e.type === "touchend"){
					scope.lmDrag({"pointerData": lastPointerData, "$event": e});
					return;
				}
				e.preventDefault();
				var pageX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
				var pageY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
				var xDif = lastX !== null ? pageX - lastX : 0;
				var yDif = lastY !== null ? pageY - lastY : 0;
				var timeDif = lastTimestamp ? e.timeStamp - lastTimestamp : 0;
				var xSpeed = lastX !== null ? xDif / timeDif : 0;
				var ySpeed = lastY !== null ? yDif / timeDif : 0;
				var pointerData = {
					type: e.type,
					xDif: xDif,
					yDif: yDif,
					xSpeed: xSpeed,
					ySpeed: ySpeed
				};
				scope.lmDrag({"pointerData": pointerData, "$event": e});

				lastTimestamp = e.timeStamp;
				lastX = pageX;
				lastY = pageY;
				lastPointerData = pointerData;
			}



			function resetPointer(){
				lastX = null;
				lastY = null;
				lastTimestamp = null;
				lastPointerData = null;
			}



			function _destroy(){
				if(pointerListenerID){
					GlobalEventsService.unregisterPointerMoveHandler(pointerListenerID);
				}
			}



			scope.$on("$destroy", _destroy);
		}
	};
}]);