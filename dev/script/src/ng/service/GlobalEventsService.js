angular.module("LMApp").factory("GlobalEventsService", ["$timeout", function ($timeout) {
	var _resizeHandlers = [];
	var _resizeHandlerID = 0;
	var _resizeTimeout = null;
	var _lastResizeEvent = null;

	var _scrollHandlers = [];
	var _scrollHandlerID = 0;
	var _pendingScrollHandlers = false;
	var _lastScrollEvent = null;

	var _pointerMoveHandlers = [];
	var _pointerMoveHandlerID = 0;
	var _pendingPointerMoveHandlers = false;
	var _lastPointerEvent = null;

	var _window = angular.element(window);
	var _body = angular.element("body");



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
	 * Registers a pointer handler to perform when body.onmousemove or body.touchmove occurs. This should be the
	 * single point globally where body-only mousemove/touchmove events are handled.
	 * Should be used sparingly, obviously.
	 *
	 * @param handler   {function}      The handler function to be executed on body.onmousemove or body.ontouchmove
	 *
	 * @returns {int}                   Returns an integer ID number of the handler to be called with the
	 *                                   unregisterPointerMoveHandler() method so it knows what to unregister.
	 */
	function registerPointerMoveHandler(handler) {
		var h = _PointerMoveHandlerInstance(handler);
		_pointerMoveHandlers.push(h);
		//When adding the first listener, add the global handler
		_pointerMoveHandlers.length === 1 && _body.on("mousemove touchmove", _pointerMoveHandler);
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
	 * Unregister a pointer handler with a given ID
	 *
	 * @param id    {int}               The ID of the pointer move handler to unregister, given by the return value of
	 *                                   the registerPointerMoveHandler() method.
	 */
	function unregisterPointerMoveHandler(id) {
		for (var i = 0; i < _pointerMoveHandlers.length; i++) {
			var h = _pointerMoveHandlers[i];
			if (h.id === id) {
				_pointerMoveHandlers.splice(i, 1);
				break;
			}
		}
		//When unregistering the last handler, remove the global handler
		!_pointerMoveHandlers.length && _body.off("mousemove touchmove", _pointerMoveHandler);
	}



	/**
	 * Requests that all scroll handlers be called. The reason this is a "request" is because to stay performant it's
	 * wrapped in a window.rAF call and may not fire listeners if a pending call is waiting to occur.
	 *
	 * @private
	 */
	function _scrollHandler(e) {
		_lastScrollEvent = e;

		if (!_pendingScrollHandlers) {
			window.requestAnimationFrame(_callScrollHandlers);
		}
		_pendingScrollHandlers = true;
	}



	/**
	 * Calls all scroll handlers and sets the last scrollEvent to null.
	 *
	 * @private
	 */
	function _callScrollHandlers(){
		for (var i = 0; i < _scrollHandlers.length; i++) {
			(_scrollHandlers[i].handler)(_lastScrollEvent);
		}
		_pendingScrollHandlers = false;
		_lastScrollEvent = null;
	}



	/**
	 * Handle a resize event, if applicable. Won't fire until the user is "done" resizing the window (meaning they've
	 * not caused a resize event to occur in over 150ms).
	 *
	 * @private
	 */
	function _resizeHandler(e){
		$timeout.cancel(_resizeTimeout);
		_lastResizeEvent = e;

		//If user stops resizing, call all handlers passing the last resize event, and then set it to null.
		_resizeTimeout = $timeout(function () {
			for (var i = 0; i < _resizeHandlers.length; i++) {
				(_resizeHandlers[i].handler)(_lastResizeEvent);
			}
			_lastResizeEvent = null;
		}, 150);
	}



	/**
	 * Requests that all pointer move handlers be called. The reason this is a "request" is because to stay performant
	 * it's wrapped in a window.rAF call and may not fire listeners if a pending call is waiting to occur.
	 *
	 * @private
	 */
	function _pointerMoveHandler(e) {
		_lastPointerEvent = e;

		if (!_pendingPointerMoveHandlers) {
			window.requestAnimationFrame(_callPointerMoveHandlers);
		}
		_pendingPointerMoveHandlers = true;
	}



	/**
	 * Calls all pointer move handlers
	 *
	 * @private
	 */
	function _callPointerMoveHandlers() {
		for (var i = 0; i < _pointerMoveHandlers.length; i++) {
			(_pointerMoveHandlers[i].handler)(_lastPointerEvent);
		}
		_pendingPointerMoveHandlers = false;
		_lastPointerEvent = null;
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
	 * Creates a _PointerMoveHandlerInstance object, to track ID and handler function.
	 *
	 * @param handler   {function}              The function to be executed as a handler
	 *
	 * @returns {{id: number, handler: function}}
	 *
	 * @throws {Error}    Will throw an error if the passed handler is not a function
	 *
	 * @private
	 */
	function _PointerMoveHandlerInstance(handler) {
		//Requires a function for handler
		if (typeof handler !== "function") {
			throw new Error("Cannot create _PointerMoveHandlerInstance. Handler must be a function.");
		}

		return {
			id: ++_pointerMoveHandlerID,
			handler: handler
		};
	}



	return {
		registerResizeHandler: registerResizeHandler,
		registerScrollHandler: registerScrollHandler,
		registerPointerMoveHandler: registerPointerMoveHandler,
		unregisterResizeHandler: unregisterResizeHandler,
		unregisterScrollHandler: unregisterScrollHandler,
		unregisterPointerMoveHandler: unregisterPointerMoveHandler
	};
}]);