angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "$q", "CONSTANT", "STRINGS", function ($rootScope, $scope, $state, $q, CONSTANT, STRINGS) {
	$scope.STRINGS = STRINGS.CORE;
	$scope.state = {
		current: {
			name: null
		},
		loading: false,
		next: {
			name: null
		},
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
	function _triggerTransition(toState) {
		if ($scope.state.transitioning || toState.name === $scope.state.current.name) {
			return;
		}
		if (!$scope.state.current.name) {
			$scope.state.current = toState;
		}

		var fromState = $scope.state.current;
		var promises = [];

		$scope.state.loading = true;
		$scope.state.transitioning = true;
		$scope.state.next = toState;
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
		$scope.state.next = null;
		$rootScope.$broadcast(CONSTANT.EVENT.PAGE.TRANSITION_COMPLETE);
	}



	$rootScope.$on("$stateChangeStart", function (e, toState, params, fromState) {
		if (!$scope.state.current.name) {
			e.preventDefault();
			_triggerTransition(toState);
		}
	});

	/**
	 * When a state load completes,
	 */
	$rootScope.$on("$stateChangeSuccess", function (e, toState, toParams, fromState, fromParams) {
		_pageLoadPromise && _pageLoadPromise.resolve();
	});

	$scope.$on(CONSTANT.EVENT.LMSREF.SREF_CHANGE, function (e, data) {
		_triggerTransition(data);
	});


	$scope.registerTransitionHandler = function (handler) {
		_transitionHandlers.push(handler);
	};

	angular.element("body").on("selectstart", function () {
		return false;
	});
}]);