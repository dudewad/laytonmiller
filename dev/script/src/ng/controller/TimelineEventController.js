angular.module("LMApp").controller("TimelineEventController", ["$rootScope", "$scope", "$http", "$state", "$sce", "CONSTANT", "LMRoute", "STRINGS", function ($rootScope, $scope, $http, $state, $sce, CONSTANT, LMRoute, STRINGS) {
	//Do a little magic parsing to find the correct data file
	$scope.rootState = _parseRootStateName().toUpperCase();
	var file = "./" + CONSTANT.PATH.DATA + CONSTANT.DATA_FILES.TIMELINE[$scope.rootState][$state.params.event.toUpperCase()];
	$scope.data = {};

	$scope.$emit(CONSTANT.EVENT.COMPONENT_LOAD_START);
	$http.get(file).
		success(function (data, status, headers, config) {
			$scope.$emit(CONSTANT.EVENT.COMPONENT_LOAD_COMPLETE);
			$rootScope.$broadcast(CONSTANT.EVENT.TIMELINE.EVENT_OPENED);
			for (var obj in data) {
				if(typeof data[obj] === "string") {
					$scope.data[obj] = $sce.trustAsHtml(data[obj]);
				}
				else{
					$scope.data[obj] = data[obj];
				}
			}
		}).
		error(function (data, status, headers, config) {
		console.log(data);
			$scope.$emit(CONSTANT.EVENT.COMPONENT_LOAD_COMPLETE);
			//Revert to root state if there is an invalid file
			LMRoute.go(_parseRootStateName());
		});



	function _parseRootStateName() {
		return $state.current.name ? $state.current.name.split(".")[0] : $state.current.name;
	}



	function _destroy(){
		$rootScope.$broadcast(CONSTANT.EVENT.TIMELINE.EVENT_CLOSED);
	}

	$scope.$on("$destroy", _destroy);
}]);