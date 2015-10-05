angular.module("LMApp").factory("AnimationService", [function () {

	var transContainer = angular.element("body > .transition");
	var transitionElements = {
		container: transContainer,
		background: transContainer.find(".background")
	};

	var transition = {
		pageTransition: function(toState, fromState){
			var b = transitionElements.background;
			var c = transitionElements.container;
			var oW = c.outerWidth();
			var oH = c.outerHeight();
			var targetSize;
			var dimension = null;

			if(oW > oH){
				dimension = "height";
			}
			else if(oH > oW) {
				dimension = "width";
			}

			c.removeClass(fromState.name);

			b.css({
				"width": "inherit",
				"height": "inherit"
			});

			if(dimension){
				targetSize = dimension === "height" ? b.outerWidth() : b.outerHeight();
			}

			//Force redraw
			b.outerHeight();

			c.addClass(toState.name);
			dimension && b.css(dimension, targetSize);
		}
	};


	return {
		transition: transition
	};
}]);