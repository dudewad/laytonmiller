angular.module("LMApp").directive("lmFullAssetViewer", [function () {
	return {
		scope: "=",
		restrict: "A",
		link: function (scope, element, attrs) {




			function _clickHandler(){
				scope.state.assetViewer = null;
				_applyScope();
			}



			function _applyScope() {
				if (!scope.$$phase) {
					scope.$apply();
				}
			}



			element.on("click", _clickHandler);
		}
	};
}]);