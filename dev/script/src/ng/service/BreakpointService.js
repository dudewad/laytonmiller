angular.module("LMApp").factory("BreakpointService", ["CONSTANT", "GlobalEventsService", function (CONSTANT, GlobalEventsService) {
	var SCREEN = CONSTANT.SCREEN;
	var currentBreakpoint;


	function breakpoint(){
		var size = angular.element(window).innerWidth();
		for (var s in SCREEN) {
			if(SCREEN.hasOwnProperty(s)){
				if(size >= SCREEN[s].MIN && size <= SCREEN[s].MAX){
					currentBreakpoint = s;
				}
			}
		}
	}



	function getCurrentBreakpoint(){
		return currentBreakpoint;
	}



	GlobalEventsService.registerResizeHandler(breakpoint);
	breakpoint();

	return {
		getCurrentBreakpoint: getCurrentBreakpoint
	};
}]);