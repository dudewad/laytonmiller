angular.module("LMApp").controller("NavigationController", ["$scope", function($scope){
	$scope.currentState = {
		active: false
	};



	$scope.activate = function(e){
		$scope.currentState.active = true;
		if (!$scope.$$phase) {
			$scope.$apply()
		}
	};



	$scope.deactivate = function(e){
		$scope.currentState.active = false;
		var target = e.type === "mouseup" ? angular.element(e.originalEvent.target) : angular.element(elementFromPoint(e));

		if(target.closest(".link-list").length){
			target.trigger("click");
		}
		if (!$scope.$$phase) {
			$scope.$apply()
		}
	};



	function elementFromPoint(e){
		var changedTouch = e.originalEvent.changedTouches[0];
		return document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
	}
}]);