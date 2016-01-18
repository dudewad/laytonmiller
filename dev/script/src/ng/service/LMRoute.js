angular.module("LMApp").factory("LMRoute", ["$rootScope", "CONSTANT", function ($rootScope, CONSTANT) {

	function go(sref) {
		$rootScope.$broadcast(CONSTANT.EVENT.LMSREF.SREF_CHANGE, {name: sref});
	}



	return {
		go: go
	};
}]);