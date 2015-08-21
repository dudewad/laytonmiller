angular.module("LMApp").directive("lmVisualizationRating", ["$timeout", function ($timeout) {
	return {
		scope: {
			rating: "="
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			var fillBar = angular.element(elm.find(".fill-bar"));
			$timeout(function(){
				fillBar.css("transform", "scaleX(" + scope.rating / 10 + ")");
			}, 500);
		}
	};
}]);