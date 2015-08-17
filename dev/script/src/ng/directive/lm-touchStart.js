angular.module("LMApp").directive("lmTouchstart", function () {
	return {
		scope: {
			lmTouchstart: "&"
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			var handler = function (e) {
				scope.lmTouchstart({"$event": e});
			};
			elm.bind("touchstart", function (e) {
				handler(e);
			});

			elm.bind("mousedown", function (e) {
				handler(e);
			});
		}
	};
});