angular.module("LMApp").factory("LM3dService", ["GlobalEventsService", "CONSTANTS", function (GlobalEventsService, CONSTANTS) {
	var _instances = [];
	var _mouseMoveHandlerID = null;
	var _resizeHandlerID = null;
	var _scrollHandlerID = null;
	var _window = $(window);
	var _viewport = {
		width: null,
		height: null,
		centerY: null,
		centerX: null,
		scrollTop: null
	};
	var _mouse = {
		page:{
			x: null,
			y: null
		},
		viewport: {
			percentageX: null,
			percentageY: null
		}
	};



	/**
	 * Returns the current state of the viewport according to the service
	 *
	 * @returns {{width: null, height: null, centerY: null, centerX: null, scrollTop: null}}
	 */
	function getViewport(){
		return _viewport;
	}



	/**
	 * Register a 3d instance that will react to mouse position
	 *
	 * @param instanceScope     The scope that should be registered
	 */
	function registerInstance(instanceScope){
		//Disallow duplicate instance registration
		if(_instances.indexOf(instanceScope) === -1){
			_instances.push(instanceScope);

			//Register performant mousemove handler (uses rAF so no need to tweak performance here)
			//It shouldn't do so until the first call, and then, only on the first call (we don't want multiple listeners)
			if(_instances.length === 1){
				_resizeHandlerID = GlobalEventsService.registerResizeHandler(_resizeHandler);
				_mouseMoveHandlerID = GlobalEventsService.registerMouseMoveHandler(_mouseMoveHandler);
				_scrollHandlerID = GlobalEventsService.registerScrollHandler(_scrollHandler);
			}
		}
		else{
			return false;
		}
	}



	/**
	 * Unregister a 3d instance (typically handles on $destroy of elements)
	 *
	 * @param instanceScope     The scope that was used when registering with the service
	 */
	function unregisterInstance(instanceScope) {
		var ind = _instances.indexOf(instanceScope);

		ind !== -1 && _instances.splice(ind, 1);

		if(!_instances.length){
			GlobalEventsService.unregisterResizeHandler(_resizeHandlerID);
			GlobalEventsService.unregisterMouseMoveHandler(_mouseMoveHandlerID);
			GlobalEventsService.unregisterScrollHandler(_scrollHandlerID);
		}
	}



	function _mouseMoveHandler(e){
		_updateMouseStats(e);
		var data = {
			mouse: _mouse,
			viewport: _viewport,
			e: e
		};

		for (var i = 0; i < _instances.length; i++) {
			var inst = _instances[i];
			_instances[i].$broadcast(CONSTANTS.EVENT.LM3D.MOUSE_MOVE, data);
		}
	}



	function _resizeHandler(e) {
		_updateViewportStats(e);
	}



	function _scrollHandler(e){
		_updateViewportStats(e);
	}



	function _updateViewportStats(e) {
		var type = (e && e.type) || "";

		switch(type.toLowerCase()){
			//Scroll only needs to update scrollTop
			case "scroll":
				_viewport.scrollTop = _window.scrollTop();
				break;
			//Default to full viewport update
			default:
				_viewport.width = _window.width();
				_viewport.height = _window.height();
				_viewport.centerX = _viewport.width * 0.5;
				_viewport.centerY = _viewport.height * 0.5;
				_viewport.diagonal = Math.sqrt((_viewport.width * _viewport.width) + (_viewport.height * _viewport.height));
				_viewport.scrollTop = _window.scrollTop();
				break;
		}

		for (var i = 0; i < _instances.length; i++) {
			_instances[i].$broadcast(CONSTANTS.EVENT.LM3D.VIEWPORT_STATE_UPDATED);
		}
	}



	function _updateMouseStats(e) {
		_mouse.page.x = e.pageX;
		_mouse.page.y = e.pageY;
		_mouse.viewport.percentageX = _mouse.page.x / _viewport.width;
		_mouse.viewport.percentageY = (_mouse.page.y - _viewport.scrollTop) / _viewport.height;
	}



	_updateViewportStats();



	return {
		registerInstance: registerInstance,
		unregisterInstance: unregisterInstance,
		getViewport: getViewport
	};
}]);