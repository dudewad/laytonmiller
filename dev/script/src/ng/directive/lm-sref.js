angular.module("LMApp").directive("lmSref", ["$rootScope", "LMRoute", "CONSTANT", function ($rootScope, LMRoute, CONSTANT) {
	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			var _sref = attrs.lmSref;



			/**
			 * Handles a click on any element with the data-lm-sref tag
			 *
			 * @private
			 */
			function _clickHandler(){
				LMRoute.go(_sref);
			}

			scope.$watch(function(){
				return attrs.disabled;
			}, function(newval, oldval){
				element.off("click", _clickHandler);
				if (newval !== oldval && newval === false || newval === undefined) {
					element.on("click", _clickHandler);
				}
			});

			scope.$on("destroy", function() {
				element.off("click", _clickHandler);
			});
		}
	};
}]);