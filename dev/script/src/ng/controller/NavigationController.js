angular.module("LMApp").controller("NavigationController", ["$scope", "STRINGS", function($scope, STRINGS){
	$scope.currentState = {
		active: false
	};
	$scope.STRINGS = STRINGS.CORE.NAVIGATION;

	$scope.navItems = [
		{
			"className": "technical-summary",
			"sref": "technical-summary",
			"text": $scope.STRINGS.TECHNICAL_SUMMARY,
			"isHovered": false
		},
		{
			"className": "experience",
			"sref": "experience",
			"text": $scope.STRINGS.EXPERIENCE,
			"isHovered": false
		},
		{
			"className": "portfolio",
			"sref": "portfolio",
			"text": $scope.STRINGS.PORTFOLIO,
			"isHovered": false
		},
		{
			"className": "contact",
			"sref": "contact",
			"text": $scope.STRINGS.CONTACT,
			"isHovered": false
		}
	];

	var currentMobileHoverDOMItem = null;
	var currentMobileHoverNavObject = null;



	$scope.activate = function(e){
		$scope.currentState.active = true;
		e.preventDefault();
		disablePageScrolling(e);
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	};



	$scope.deactivate = function(e){
		var target;
		var isMouse = e.type === "mouseup";

		if(isMouse){
			target = angular.element(e.originalEvent.target);
		}
		else{
			target = angular.element(elementFromPoint(e));
			currentMobileHoverDOMItem = null;
			currentMobileHoverNavObject = null;
			setCurrentMobileNavHover();
		}

		$scope.currentState.active = false;
		enablePageScrolling(e);


		if(target.closest(".link-list").length){
			if(isMouse) {
				e.stopPropagation();
			}
			target.trigger("click");
		}
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	};



	function disablePageScrolling(e){
		var target = e.type === "mousedown" ? angular.element(e.originalEvent.target) : angular.element(elementFromPoint(e));
		target.closest("nav").on("touchmove", touchMoveListener);
	}



	function enablePageScrolling(e){
		var target = e.type === "mouseup" ? angular.element(e.originalEvent.target) : angular.element(elementFromPoint(e));
		target.closest("nav").off("touchmove", touchMoveListener);
	}



	function touchMoveListener(e){
		e.preventDefault();
		var target = angular.element(elementFromPoint(e));
		if(!target.length){
			currentMobileHoverDOMItem = null;
			return;
		}

		if(!target.is("li")){
			target = target.closest("li");
		}

		if(!target.length){
			currentMobileHoverDOMItem = null;
			return;
		}

		if (target.is(currentMobileHoverDOMItem)) {
			return;
		}

		currentMobileHoverDOMItem = target;
		setCurrentMobileNavHover();
		$scope.$apply();
	}



	function setCurrentMobileNavHover(){
		//Un-hover all items if the current item is null.
		if(!currentMobileHoverDOMItem){
			for (var index in $scope.navItems) {
				$scope.navItems[index].isHovered = false;
			}
			return;
		}

		for (var ind in $scope.navItems) {
			var i = $scope.navItems[ind];
			if (currentMobileHoverDOMItem.attr("class").indexOf(i.className) != -1) {
				if (currentMobileHoverNavObject) {
					currentMobileHoverNavObject.isHovered = false;
				}
				currentMobileHoverNavObject = i;
				currentMobileHoverNavObject.isHovered = true;
				return;
			}
		}
	}


	function elementFromPoint(e){
		var changedTouch = e.originalEvent.changedTouches[0];
		return document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
	}
}]);