angular.module("LMApp").factory("LM3dService", ["GlobalEventsService", function (GlobalEventsService) {
	var instances = [];
	var mouseMoveHandlerID = null;



	/**
	 * Register a 3d instance that will react to mouse position
	 * @param instanceScope
	 */
	function registerInstance(instanceScope){
		//Disallow duplicate instance registration
		if(instances.indexOf(instanceScope) === -1){
			instances.push(instanceScope);

			//Register performant mousemove handler (uses rAF so no need to tweak performance here)
			//It shouldn't do so until the first call, and then, only on the first call (we don't want multiple listeners)
			if(instances.length === 1){
				mouseMoveHandlerID = GlobalEventsService.registerMouseMoveHandler(mouseMoveHandler);
			}
		}
		else{
			return false;
		}
	}



	/**
	 * Unregister a 3d instance (typically handles on $destroy of elements)
	 * @param instanceScope
	 */
	function unregisterInstance(instanceScope) {
		var ind = instances.indexOf(instanceScope);
		if (ind !== -1) {
			instances.splice(ind, 1);
		}
		!instances.length && GlobalEventsService.unregisterMouseMoveHandler(mouseMoveHandlerID);
	}



	function mouseMoveHandler(e){
		for (var i = 0; i < instances.length; i++) {
			var inst = instances[i];
			console.log("instance found!");
		}
	}



	return {
		registerInstance: registerInstance,
		unregisterInstance: unregisterInstance
	};
}]);