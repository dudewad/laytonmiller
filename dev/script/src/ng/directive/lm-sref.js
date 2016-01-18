angular.module("LMApp").directive("lmSref", ["$rootScope", "$state", "CONSTANT", function ($rootScope, $state, CONSTANT) {
	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			var _sref;
			var _params;



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
				_parseParams();
				$rootScope.$broadcast(CONSTANT.EVENT.LMSREF.SREF_CHANGE, {name: _sref, params: _params});
			}



			/**
			 * Parse passed parameters object if applicable
			 *
			 * @private
			 */
			function _parseParams() {
				if (attrs.lmSref.indexOf("(") !== -1) {
					_sref = attrs.lmSref.split("(")[0];
					_params = attrs.lmSref.split("(")[1];
					_params = _params.trim().substr(0, _params.length - 1);
					_params = JSON.parse(_params.replace("'", "\""));
				}
				else{
					_sref = attrs.lmSref;
				}
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