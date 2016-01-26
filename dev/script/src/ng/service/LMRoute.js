angular.module("LMApp").factory("LMRoute", ["$state", function ($state) {

	function go(sref) {
		var data = parseParams(sref);
		$state.go(data.name, data.params);
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