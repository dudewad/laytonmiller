angular.module("LMApp").directive("lmSref", ["LMRoute", function (LMRoute) {
	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			/**
			 * Directive setup encapsulated here
			 *
			 * @private
			 */
			function _init() {
				scope.$on("destroy", _destroy);
				element.on("click", _clickHandler);
			}



			/**
			 * Handles a click on any element with the data-lm-sref tag
			 *
			 * @private
			 */
			function _clickHandler() {
				if (attrs.disabled) {
					return;
				}
				LMRoute.go(attrs.lmSref);
			}



			/**
			 * On destroy...
			 *
			 * @private
			 */
			function _destroy() {
				element.off("click", _clickHandler);
			}



			_init();
		}
	};
}]);