angular.module("LMApp").controller("RootController", ["$rootScope", "$scope", "$state", "$cookies", "$q", "CONSTANT", "STRINGS", function ($rootScope, $scope, $state, $cookies, $q, CONSTANT, STRINGS) {
	$scope.STRINGS = STRINGS.CORE;
	$scope.state = {
		current: {
			name: null
		},
		next: {
			name: null
		},
		loading: false,
		transitioning: false,
		assetViewer: null,
		language: $cookies.get("lang")
	};
	$scope.load = {
		component: false,
		page: false
	};
	$scope.flags = {
		playedTimelineHint: false
	};
	$scope.languages = CONSTANT.LANGUAGE;

	var _transitionHandlers = [];



	/**
	 * Performs a transition, which then goes to a target state.
	 *
	 * @param e         {object}        The change event
	 *
	 * @param data      {object}        Contains data about lm-sref being targeted
	 *
	 * @private
	 */
	function _triggerTransitionOut(e, data) {
		var fromState = $state.$current && $state.$current.name || null;
		var toState = $state.get(data.name);
		var all;
		var promises = [];

		if ($scope.state.transitioning) {
			e.preventDefault();
			return;
		}
		if (!$scope.state.current.name) {
			$scope.state.current.name = toState.name;
		}

		$scope.state.transitioning = true;
		$scope.state.next.name = toState.name;
		for (var i = 0; i < _transitionHandlers.length; i++) {
			var h = _transitionHandlers[i];
			var p = $q.defer();
			typeof h === "function" && (h)(p, toState, fromState);
			promises.push(p.promise);
		}

		all = $q.all(promises);
		$scope.load.page = true;
		_applyScope();

		all.then(function () {
			_transitionOutCompleteHandler(toState, fromState);
		});
	}



	/**
	 * When a transition completes, this will begin the load of the next section. This should be the only instance of
	 * the state.go call in the entire application.
	 *
	 * @param toState
	 */
	function _transitionOutCompleteHandler(toState) {
		$scope.state.current.name = toState.name;
		$scope.state.transitioning = false;
		$scope.state.next.name = null;
		$scope.load.page = false;
		$rootScope.$broadcast(CONSTANT.EVENT.PAGE.TRANSITION_OUT_COMPLETE);
		_applyScope();
	}



	/**
	 * When a state load starts
	 */
	$rootScope.$on("$stateChangeStart", function (e, toState) {
		_triggerTransitionOut(e, toState);
	});



	/**
	 * Fires when a component needs the loader to appear
	 */
	$scope.$on(CONSTANT.EVENT.COMPONENT_LOAD_START, function () {
		$scope.load.component = true;
		_applyScope();
	});



	/**
	 * Fires when a component has finished loading and no longer needs the loader
	 */
	$scope.$on(CONSTANT.EVENT.COMPONENT_LOAD_COMPLETE, function () {
		$scope.load.component = false;
		_applyScope();
	});



	/**
	 * Allows external components to register transition functions.
	 *
	 * @param handler
	 */
	$scope.registerTransitionHandler = function (handler) {
		_transitionHandlers.push(handler);
	};



	/**
	 * Returns only the root state name, excluding any nested states after the "."
	 *
	 * @param state
	 *
	 * @returns {null}
	 */
	$scope.parseRootStateName = function (state) {
		var s = state ? state : $scope.state.current.name;
		return s ? s.split(".")[0] : s;
	};



	/**
	 * Returns the full state name, including nested state
	 */
	$scope.parseFullStateName = function (state) {
		var s = state ? state : $scope.state.current.name;
		s = s ? s.split(".").join("-") : s;
		return s;
	};



	/**
	 * Watch for when to toggle the loader
	 */
	$scope.$watch(function () {
		return $scope.load.page || $scope.load.component || $scope.state.transitioning;
	}, _setLoadState);



	/**
	 * Toggle the load state.
	 *
	 * @param isLoading {boolean}   Whether or not the load state should be active (true) or inactive (false)
	 *
	 * @private
	 */
	function _setLoadState(isLoading) {
		$scope.state.loading = isLoading;
	}



	/**
	 * One of the reasons I don't like angular...
	 *
	 * @private
	 */
	function _applyScope() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}
}]);