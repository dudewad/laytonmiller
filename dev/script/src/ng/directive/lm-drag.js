angular.module("LMApp").directive("lmDrag", [function () {
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

			/*Support handlers to each bound listener that is triggered when the user touches/mousedowns*/
			function touchEndFn (e) {
				body.off("touchmove", handler);
				body.off("touchend", touchEndFn);
				handler(e);
				resetPointer();
			}

			function mouseUpFn (e) {
				body.off("mousemove", handler);
				body.off("mouseup", mouseUpFn);
				handler(e);
				resetPointer();
			}

			/*Bind Mousedown/touchstart events*/
			elm.on("touchstart", function (e) {
				body.on("touchmove", handler);
				body.on("touchend", touchEndFn);
				handler(e);
			});

			elm.on("mousedown", function (e) {
				body.on("mousemove", handler);
				body.on("mouseup", mouseUpFn);
				handler(e);
			});



			function handler(e) {
				if(e.type === "touchend"){
					scope.lmDrag({"pointerData": lastPointerData, "$event": e});
					return;
				}
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
		}
	};
}]);