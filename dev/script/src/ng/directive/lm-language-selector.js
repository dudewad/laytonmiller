angular.module("LMApp").directive("lmLanguageSelector", ["$cookies", "$window", function ($cookies, $window) {
	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			scope.languageSelectorState = {
				active: false
			};



			scope.languageChangeHandler = function(newVal){
				if($cookies.get("lang").toLowerCase() !== newVal.toLowerCase()) {
					$cookies.put("lang", newVal);
					$window.location.reload();
				}
			};



			scope.showLanguageSelector = function(){
				scope.languageSelectorState.active = true;
			};



			scope.hideLanguageSelector = function(e){
				if($(e.originalEvent.target).is("[data-hide-lm-language-selector]")) {
					scope.languageSelectorState.active = false;
				}
			};
		}
	};
}]);