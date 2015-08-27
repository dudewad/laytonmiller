angular.module("LMApp").directive("lmTouchstart", function () {
	return {
		scope: {
			lmTouchstart: "&"
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			function handler (e) {
				scope.lmTouchstart({"$event": e});
			}

			elm.on("touchstart", function (e) {
				handler(e);
			});

			elm.on("mousedown", function (e) {
				handler(e);
			});
		}
	};
});