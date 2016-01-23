angular.module("LMApp").controller("TimelineEventController", ["$rootScope", "$scope", "$http", "$state", "$sce", "CONSTANT", "LMRoute", "STRINGS", function ($rootScope, $scope, $http, $state, $sce, CONSTANT, LMRoute, STRINGS) {
	//Do a little magic parsing to find the correct data file
	$scope.rootState = _parseRootStateName().toUpperCase();
	$scope.data = {};
	//Parse file name from known parameters
	var file = "./" + CONSTANT.PATH.DATA.toLowerCase() + "/" + $scope.rootState.toLowerCase() + "/" + STRINGS.CORE.LANGUAGE.toLowerCase() + "/" + $state.params.event.toLowerCase() + ".json";
	file = file.toLowerCase();
	file = file.replace(/_/g, "-");
	file = file.replace("//", "/");
	console.log(file);

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



	$scope.thumbClickHandler = function(fullAssetURL){
		$scope.state.assetViewer = fullAssetURL;
	};

	$scope.$on("$destroy", _destroy);
}]);