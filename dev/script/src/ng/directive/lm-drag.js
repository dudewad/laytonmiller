angular.module("LMApp").directive("lmDrag", ["GlobalEventsService", "$timeout", function (GlobalEventsService, $timeout) {
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
			function pointerUpFn (e) {
				GlobalEventsService.unregisterPointerMoveHandler(pointerListenerID);
				pointerListenerID = null;
				handler(e);
				resetPointer();
			}

			/*Bind Mousedown/touchstart events*/
			elm.on("touchstart mousedown", function (e) {
				pointerListenerID && GlobalEventsService.unregisterPointerMoveHandler(pointerListenerID);
				if(e.type === "touchstart") {
					e.preventDefault();
					body.one("touchend", pointerUpFn);
				}
				else if(e.type === "mousedown"){
					body.one("mouseup", pointerUpFn);
				}
				handler(e);
				//Needs timeout because Chrome fires mouse move and click despite there being no mousemove.
				$timeout(function () {
					pointerListenerID = GlobalEventsService.registerPointerMoveHandler(handler);
				}, 0);
			});



			function handler(e) {
				if(e.type === "touchend"){
					//console.log("last data: ", lastPointerData);
					scope.lmDrag({"pointerData": lastPointerData, "$event": e});
					return;
				}
				if(e.type.toLowerCase().indexOf("mouse") !== -1) {
					e.preventDefault();
				}
				var pageX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
				var pageY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
				var xDif = lastX !== null ? pageX - lastX : 0;
				var yDif = lastY !== null ? pageY - lastY : 0;
				var timeDif = lastTimestamp ? e.timeStamp - lastTimestamp : 0;
				var xSpeed = lastX !== null ? xDif / timeDif : 0;
				var ySpeed = lastY !== null ? yDif / timeDif : 0;
				if(isNaN(xSpeed)){
					xSpeed = 0;
				}
				if(isNaN(ySpeed)){
					ySpeed = 0;
				}
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