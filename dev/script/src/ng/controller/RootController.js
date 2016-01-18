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
	$scope.load = {
		component: false,
		page: false
	};
	var _transitionHandlers = [];
	var _pageLoadPromise = null;



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
		//If there's no from state, this is a manual call from the initial page load. Don't fire another load go call.
		if(fromState) {
			_pageLoadPromise = $state.go(data.name, data.params);
			promises.push(_pageLoadPromise.promise);
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
	 *
	 * @param fromState
	 */
	function _transitionOutCompleteHandler(toState, fromState) {
		$scope.state.current.name = toState.name;
		$scope.state.transitioning = false;
		$scope.state.next.name = null;
		$scope.load.page = false;
		$rootScope.$broadcast(CONSTANT.EVENT.PAGE.TRANSITION_OUT_COMPLETE);
		_applyScope();
	}



	$rootScope.$on(CONSTANT.EVENT.LMSREF.SREF_CHANGE, _triggerTransitionOut);



	/**
	 * When a state load starts,
	 */
	$rootScope.$on("$stateChangeSuccess", function (e, toState, toParams, fromState, fromParams) {
	});



	/**
	 * When a state load completes,
	 */
	$rootScope.$on("$stateChangeStart", function (e, toState, toParams, fromState, fromParams) {
		if(!fromState.name) {
			_triggerTransitionOut(e, toState);
		}
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



	$scope.registerTransitionHandler = function (handler) {
		_transitionHandlers.push(handler);
	};



	$scope.parseRootStateName = function(state){
		var s = state ? state : $scope.state.current.name;
		return s ? s.split(".")[0] : s;
	};



	$scope.parseFullStateName = function(state){
		var s = state ? state : $scope.state.current.name;
		s = s ? s.split(".").join("-") : s;
		return s;
	};



	$scope.$watch(function(){
		return $scope.load.page || $scope.load.component || $scope.state.transitioning;
	}, _setLoadState);



	function _applyScope() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}



	function _setLoadState(isLoading){
		$scope.state.loading = isLoading;
	}



	angular.element("body").on("selectstart", function () {
		return false;
	});
}]);