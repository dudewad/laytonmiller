angular.module("LMApp").factory("LMRoute", ["$rootScope", "CONSTANT", function ($rootScope, CONSTANT) {

	function go(name, params) {
		$rootScope.$broadcast(CONSTANT.EVENT.LMSREF.SREF_CHANGE, {name: name, params: params});
	}



	return {
		go: go
	};
}]);