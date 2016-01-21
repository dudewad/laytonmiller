angular.module("LMApp").directive("lmVisualizationRating", ["$timeout", "GlobalEventsService", function ($timeout, GlobalEventsService) {
	return {
		scope: {
			rating: "="
		},
		restrict: "A",
		link: function (scope, elm, attrs) {
			var _fillBar = angular.element(elm.find(".fill-bar"));
			var _w = angular.element(window);
			var _scrollListenerID;
			scope.seen = false;



			function _init() {
				scope.$watch("seen", _handleVisibilityChange);
				_scrollListenerID = GlobalEventsService.registerScrollHandler(_scrollHandler);
				_scrollHandler();
			}



			function _visible(){
				var viewportTop = _w.scrollTop();
				var viewportBottom = viewportTop + _w.outerHeight();
				var elTop = elm.offset().top;
				var elBottom = elTop + elm.outerHeight();

				if(elBottom < viewportBottom && elTop > viewportTop){
					$timeout(function(){
						scope.seen = true;
					},0);
				}
			}



			function _scrollHandler(){
				_visible();
			}



			function _handleVisibilityChange(newVal){
				if(newVal){
					GlobalEventsService.unregisterScrollHandler(_scrollListenerID);
					_fillBar.css("transform", "scaleX(" + scope.rating / 5 + ")");
				}
			}



			_init();
		}
	};
}]);