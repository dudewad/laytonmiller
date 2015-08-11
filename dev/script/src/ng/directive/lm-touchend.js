angular.module("LMApp").directive("lmTouchend", function () {
	return {
		scope: {
			lmTouchend: "&"
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			var handler = function (e) {
				scope.lmTouchend({"$event": e});
			};

			elm.bind("touchend", function (e) {
				handler(e);
			});

			elm.bind("mouseup", function (e) {
				handler(e);
			});
		}
	};
});