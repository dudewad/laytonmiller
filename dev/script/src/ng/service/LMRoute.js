angular.module("LMApp").factory("LMRoute", ["$rootScope", "CONSTANT", function ($rootScope, CONSTANT) {

	function go(sref) {
		$rootScope.$broadcast(CONSTANT.EVENT.LMSREF.SREF_CHANGE, parseParams(sref));
	}



	/**
	 * Parse passed parameters object if applicable
	 *
	 * @private
	 */
	function parseParams(sref) {
		var o = {
			name: sref,
			params: undefined
		};
		var temp;

		if (sref.indexOf("(") !== -1) {
			o.name = sref.split("(")[0];
			temp = sref.split("(")[1];
			temp = temp.trim().substr(0, temp.length - 1);
			o.params = JSON.parse(temp.replace("'", "\""));
		}

		return o;
	}



	return {
		go: go,
		parseParams: parseParams
	};
}]);