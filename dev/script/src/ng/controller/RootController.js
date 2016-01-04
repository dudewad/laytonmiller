angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "$q", "CONSTANT", "STRINGS", function ($rootScope, $scope, $state, $q, CONSTANT, STRINGS) {
	$scope.STRINGS = STRINGS.CORE;
	$scope.state = {
		current: {
			name: null
		},
		next: {
			name: null
		},
		loading: false,
		transitioning: false
	};
	var _transitionHandlers = [];
	var _pageLoadPromise = null;



	/**
	 * Performs a transition, which then goes to a target state.
	 *
	 * @param toState
	 *
	 * @private
	 */
	function _triggerTransition(e, toState, params, fromState) {
		if ($scope.state.transitioning) {
			e.preventDefault();
			return;
		}
		if (!$scope.state.current.name) {
			$scope.state.current.name = toState.name;
		}

		var promises = [];

		$scope.state.loading = true;
		$scope.state.transitioning = true;
		$scope.state.next.name = toState.name;
		for (var i = 0; i < _transitionHandlers.length; i++) {
			var h = _transitionHandlers[i];
			var p = $q.defer();
			typeof h === "function" && (h)(p, toState, fromState);
			promises.push(p.promise);
		}
		_pageLoadPromise = $q.defer();
		promises.push(_pageLoadPromise.promise);

		var all = $q.all(promises);
		$state.go(toState.name);
		all.then(function () {
			_pageTransitionCompleteHandler(toState, fromState);
		});
	}



	/**
	 * When a transition completes, this will begin the load of the next section. This should be the only instance of
	 * the state.go call in the entire application.
	 *
	 * @param toState
	 *
	 * @param fromState
	 */
	function _pageTransitionCompleteHandler(toState, fromState) {
		//$state.go(toState.name);
		$scope.state.loading = false;
		$scope.state.current.name = toState.name;
		$scope.state.transitioning = false;
		$scope.state.next.name = null;
		$rootScope.$broadcast(CONSTANT.EVENT.PAGE.TRANSITION_COMPLETE);
	}



	$rootScope.$on("$stateChangeStart", _triggerTransition);



	/**
	 * When a state load completes,
	 */
	$rootScope.$on("$stateChangeSuccess", function (e, toState, toParams, fromState, fromParams) {
		_pageLoadPromise && _pageLoadPromise.resolve();
	});



	/**
	 * Fires when a component needs the loader to appear
	 */
	$scope.$on(CONSTANT.EVENT.COMPONENT_LOAD_START, function () {
		$scope.state.loading = true;
	});



	/**
	 * Fires when a component has finished loading and no longer needs the loader
	 */
	$scope.$on(CONSTANT.EVENT.COMPONENT_LOAD_COMPLETE, function () {
		$scope.state.loading = false;
	});



	$scope.registerTransitionHandler = function (handler) {
		_transitionHandlers.push(handler);
	};



	$scope.parseRootStateName = function(state){
		var s = state ? state : $scope.state.current.name;
		return s ? s.split(".")[0] : s;
	};



	angular.element("body").on("selectstart", function () {
		return false;
	});
}]);