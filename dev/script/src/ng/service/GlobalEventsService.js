angular.module("LMApp").factory("GlobalEventsService", ["$timeout", function ($timeout) {
	var resizeHandlers = [];
	var resizeHandlerID = 0;
	var scrollHandlers = [];
	var scrollHandlerID = 0;
	var resizeTimeout = null;
	var _window = angular.element(window);
	var lastScrollY;
	var pendingScrollHandlers = false;



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
		var h = ResizeHandler(handler);
		resizeHandlers.push(h);
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
		var h = ScrollHandler(handler);
		scrollHandlers.push(h);
		return h.id;
	}



	/**
	 * Unregister a resize handler with a given ID
	 *
	 * @param id    {int}               The ID of the resize handler to unregister, given by the return value of the
	 *                                   registerResizeHandler() method.
	 */
	function unregisterResizeHandler(id){
		for (var i = 0; i < resizeHandlers.length; i++) {
			var h = resizeHandlers[i];
			if(h.id === id){
				resizeHandlers.splice(i, 1);
				i = resizeHandlers.length;
			}
		}
	}



	/**
	 * Unregister a scroll handler with a given ID
	 *
	 * @param id    {int}               The ID of the scroll handler to unregister, given by the return value of the
	 *                                   registerScrollHandler() method.
	 */
	function unregisterScrollHandler(id){
		for (var i = 0; i < scrollHandlers.length; i++) {
			var h = scrollHandlers[i];
			if(h.id === id){
				scrollHandlers.splice(i, 1);
				i = scrollHandlers.length;
			}
		}
	}



	/**
	 * Creates a ResizeHandler object, to track ID and handler function.
	 *
	 * @param handler   {function}          The function to be executed as a handler
	 *
	 * @returns {object}
	 *
	 * @constructor
	 */
	function ResizeHandler(handler){
		return {
			id: resizeHandlerID++,
			handler: handler
		};
	}



	/**
	 * Creates a ScrollHandler object, to track ID and handler function.
	 *
	 * @param handler   {function}          The function to be executed as a handler
	 *
	 * @returns {object}
	 *
	 * @constructor
	 */
	function ScrollHandler(handler){
		return {
			id: scrollHandlerID++,
			handler: handler
		};
	}



	function callScrollHandlers(){
		pendingScrollHandlers = false;
		for (var i = 0; i < scrollHandlers.length; i++) {
			(scrollHandlers[i].handler)(event);
		}
	}



	function requestHandlersCall(){
		if(!pendingScrollHandlers){
			requestAnimationFrame(callScrollHandlers);
		}
		pendingScrollHandlers = true;
	}



	//Kick off event listeners for the window
	_window.on("resize", function(event){
		$timeout.cancel(resizeTimeout);

		resizeTimeout = $timeout(function () {
				for (var i = 0; i < resizeHandlers.length; i++) {
					(resizeHandlers[i].handler)(event);
				}
			}, 150);
	});



	_window.on("scroll", function(event){
		lastScrollY = _window.scrollTop();
		requestHandlersCall();
	});



	return {
		registerResizeHandler: registerResizeHandler,
		registerScrollHandler: registerScrollHandler,
		unregisterResizeHandler: unregisterResizeHandler,
		unregisterScrollHandler: unregisterScrollHandler
	};
}]);