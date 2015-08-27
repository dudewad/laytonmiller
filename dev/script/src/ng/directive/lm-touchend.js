angular.module("LMApp").directive("lmTouchend", function () {
	return {
		scope: {
			lmTouchend: "&"
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			function handler (e) {
				scope.lmTouchend({"$event": e});
			}

			elm.on("touchend", function (e) {
				handler(e);
			});

			elm.on("mouseup", function (e) {
				handler(e);
			});
		}
	};
});