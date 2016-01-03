angular.module("LMApp").controller("TimelineEventController", ["$rootScope", "$scope", "$http", "$state", "CONSTANT", "STRINGS", function ($rootScope, $scope, $http, $state, CONSTANT, STRINGS) {
	//Do a little magic parsing to find the correct data file
	var rootState = _parseRootStateName().toUpperCase();
	var file = CONSTANT.PATH.DATA + CONSTANT.DATA_FILES.TIMELINE[rootState][$state.params.event.toUpperCase()];
	$scope.data = {};

	$scope.$emit(CONSTANT.EVENT.COMPONENT_LOAD_START);
	$http.get(file).
		success(function (data, status, headers, config) {
			$scope.$emit(CONSTANT.EVENT.COMPONENT_LOAD_COMPLETE);
			$rootScope.$broadcast(CONSTANT.EVENT.TIMELINE.EVENT_OPENED);
			$scope.data = data;
		}).
		error(function (data, status, headers, config) {
			$scope.$emit(CONSTANT.EVENT.COMPONENT_LOAD_COMPLETE);
			//Revert to root state if there is an invalid file
			$state.go(_parseRootStateName());
		});



	function _parseRootStateName() {
		return $scope.state.current.name ? $scope.state.current.name.split(".")[0] : $scope.state.current.name;
	}



	function _destroy(){
		$rootScope.$broadcast(CONSTANT.EVENT.TIMELINE.EVENT_CLOSED);
	}

	$scope.$on("$destroy", _destroy);
}]);