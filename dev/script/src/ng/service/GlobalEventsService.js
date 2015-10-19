angular.module("LMApp").factory("GlobalEventsService", ["$timeout", function ($timeout) {
	var _resizeHandlers = [];
	var _resizeHandlerID = 0;
	var _resizeTimeout = null;

	var _scrollHandlers = [];
	var _scrollHandlerID = 0;
	var _pendingScrollHandlers = false;

	var _mouseMoveHandlers = [];
	var _mouseMoveHandlerID = 0;
	var _pendingMouseMoveHandlers = false;

	var _window = angular.element(window);
	var _body = angular.element("body");
	var _lastScrollY;



	/**
	 * Registers a handler to perform when window.resize occurs. This should be the single point globally where resize
	 * events are handled.
	 *
	 * @param handler   {function}      The handler function to be executed on window.resize
	 *
	 * @returns {int}                   Returns an integer ID number of the handler to be called with the
	 *                                   unregisterResizeHandler() method so it knows what to unregister.
	 */
	function registerResizeHandler(handler){
		var h = _ResizeHandlerInstance(handler);
		_resizeHandlers.push(h);
		//When adding the first listener, add the window.onresize handler
		_resizeHandlers.length === 1 && _window.on("resize", _resizeHandler);
		return h.id;
	}



	/**
	 * Registers a handler to perform when window.onscroll occurs. This should be the single point globally where scroll
	 * events are handled.
	 *
	 * @param handler   {function}      The handler function to be executed on window.onscroll
	 *
	 * @returns {int}                   Returns an integer ID number of the handler to be called with the
	 *                                   unregisterScrollHandler() method so it knows what to unregister.
	 */
	function registerScrollHandler(handler){
		var h = _ScrollHandlerInstance(handler);
		_scrollHandlers.push(h);
		//When adding the first listener, add the window.scroll handler
		_scrollHandlers.length === 1 && _window.on("scroll", _scrollHandler);
		return h.id;
	}



	/**
	 * Registers a mousemove handler to perform when body.onmousemove occurs. This should be the single point globally
	 * where body-only mousemove events are handled. Should be used sparingly, obviously.
	 *
	 * @param handler   {function}      The handler function to be executed on body.onmousemove
	 *
	 * @returns {int}                   Returns an integer ID number of the handler to be called with the
	 *                                  unregisterMouseMoveHandler() method so it knows what to unregister.
	 */
	function registerMouseMoveHandler(handler){
		var h = _MouseMoveHandlerInstance(handler);
		_mouseMoveHandlers.push(h);
		//When adding the first listener, add the window.scroll handler
		_mouseMoveHandlers.length === 1 && _body.on("mousemove", _mouseMoveHandler);
		return h.id;
	}



	/**
	 * Unregister a resize handler with a given ID
	 *
	 * @param id    {int}               The ID of the resize handler to unregister, given by the return value of the
	 *                                  registerResizeHandler() method.
	 */
	function unregisterResizeHandler(id){
		for (var i = 0; i < _resizeHandlers.length; i++) {
			var h = _resizeHandlers[i];
			if(h.id === id){
				_resizeHandlers.splice(i, 1);
				break;
			}
		}
		//When unregistering the last handler, remove the window.onresize handler
		!_resizeHandlers.length && _window.off("resize", _resizeHandler);
	}



	/**
	 * Unregister a scroll handler with a given ID
	 *
	 * @param id    {int}               The ID of the scroll handler to unregister, given by the return value of the
	 *                                   registerScrollHandler() method.
	 */
	function unregisterScrollHandler(id){
		for (var i = 0; i < _scrollHandlers.length; i++) {
			var h = _scrollHandlers[i];
			if(h.id === id){
				_scrollHandlers.splice(i, 1);
				break;
			}
		}
		//When unregistering the last handler, remove the window.onscroll handler
		!_scrollHandlers.length && _window.off("scroll", _scrollHandler);
	}



	/**
	 * Unregister a mousemove handler with a given ID
	 *
	 * @param id    {int}               The ID of the mousemove handler to unregister, given by the return value of the
	 *                                   registerMouseMoveHandler() method.
	 */
	function unregisterMouseMoveHandler(id){
		for (var i = 0; i < _mouseMoveHandlers.length; i++) {
			var h = _mouseMoveHandlers[i];
			if(h.id === id){
				_mouseMoveHandlers.splice(i, 1);
				break;
			}
		}
		//When unregistering the last handler, remove the window.onscroll handler
		!_mouseMoveHandlers.length && _body.off("mousemove", _mouseMoveHandler);
	}



	/**
	 * Requests that all scroll handlers be called. The reason this is a "request" is because to stay performant it's
	 * wrapped in a window.rAF call and may not fire listeners if a pending call is waiting to occur.
	 *
	 * @private
	 */
	function _scrollHandler() {
		_lastScrollY = _window.scrollTop();

		if (!_pendingScrollHandlers) {
			requestAnimationFrame(_callScrollHandlers);
		}
		_pendingScrollHandlers = true;
	}



	/**
	 * Calls all scroll handlers
	 *
	 * @private
	 */
	function _callScrollHandlers(){
		for (var i = 0; i < _scrollHandlers.length; i++) {
			(_scrollHandlers[i].handler)(event);
		}
		_pendingScrollHandlers = false;
	}



	/**
	 * Handle a resize event, if applicable. Won't fire until the user is "done" resizing the window (meaning they've
	 * not caused a resize event to occur in over 150ms).
	 *
	 * @private
	 */
	function _resizeHandler(){
		$timeout.cancel(_resizeTimeout);

		_resizeTimeout = $timeout(function () {
			for (var i = 0; i < _resizeHandlers.length; i++) {
				(_resizeHandlers[i].handler)(event);
			}
		}, 150);
	}



	/**
	 * Requests that all mousemove handlers be called. The reason this is a "request" is because to stay performant it's
	 * wrapped in a window.rAF call and may not fire listeners if a pending call is waiting to occur.
	 *
	 * @private
	 */
	function _mouseMoveHandler() {
		if (!_pendingMouseMoveHandlers) {
			requestAnimationFrame(_callMouseMoveHandlers);
		}
		_pendingMouseMoveHandlers = true;
	}



	/**
	 * Calls all mousemove handlers
	 *
	 * @private
	 */
	function _callMouseMoveHandlers() {
		for (var i = 0; i < _mouseMoveHandlers.length; i++) {
			(_mouseMoveHandlers[i].handler)(event);
		}
		_pendingMouseMoveHandlers = false;
	}



	/**
	 * Creates a _ResizeHandlerInstance object, to track ID and handler function.
	 *
	 * @param handler   {function}          The function to be executed as a handler
	 *
	 * @returns {{id: number, handler: function}}
	 *
	 * @throws {Error}    Will throw an error if the passed handler is not a function
	 *
	 * @constructor
	 */
	function _ResizeHandlerInstance(handler) {
		//Requires a function for handler
		if (typeof handler !== "function") {
			throw new Error("Cannot create _ResizeHandlerInstance. Handler must be a function.");
		}

		return {
			id: ++_resizeHandlerID,
			handler: handler
		};
	}



	/**
	 * Creates a _ScrollHandlerInstance object, to track ID and handler function.
	 *
	 * @param handler   {function}          The function to be executed as a handler
	 *
	 * @returns {{id: number, handler: function}}
	 *
	 * @throws {Error}    Will throw an error if the passed handler is not a function
	 *
	 * @private
	 */
	function _ScrollHandlerInstance(handler) {
		//Requires a function for handler
		if (typeof handler !== "function") {
			throw new Error("Cannot create _ScrollHandlerInstance. Handler must be a function.");
		}

		return {
			id: ++_scrollHandlerID,
			handler: handler
		};
	}



	/**
	 * Creates a _MouseMoveHandler object, to track ID and handler function.
	 *
	 * @param handler   {function}          The function to be executed as a handler
	 *
	 * @returns {{id: number, handler: function}}
	 *
	 * @throws {Error}    Will throw an error if the passed handler is not a function
	 *
	 * @private
	 */
	function _MouseMoveHandlerInstance(handler) {
		//Requires a function for handler
		if(typeof handler !== "function"){
			throw new Error("Cannot create _MouseMoveHandlerInstance. Handler must be a function.");
		}

		return {
			id: ++_mouseMoveHandlerID,
			handler: handler
		};
	}



	return {
		registerResizeHandler: registerResizeHandler,
		registerScrollHandler: registerScrollHandler,
		registerMouseMoveHandler: registerMouseMoveHandler,
		unregisterResizeHandler: unregisterResizeHandler,
		unregisterScrollHandler: unregisterScrollHandler,
		unregisterMouseMoveHandler: unregisterMouseMoveHandler
	};
}]);