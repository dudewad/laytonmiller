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



	var string = {
		randomFadeIn: function (element, duration, offsetLabel, offsetMin, offsetMax){
			var t = new TimelineMax();
			wrapLetters(element);
			var spans = element.find("span");

			spans.each(function () {
				t.from($(this), duration, {"opacity": 0}, offsetLabel + "+=" + randomStartOffset(offsetMin, offsetMax));
			});

			return t;
		}
	};



	/**
	 * Wraps letters of a string in spans, skipping spaces
	 *
	 * @param element   {object}    A jQuery selection of the target string whose letters are to be wrapped.
	 */
	function wrapLetters(element) {
		var str = element.text();
		element.html("");
		for (var i = 0; i < str.length; i++) {
			var newLetter = str[i].trim().length ? $("<span>" + str[i] + "</span>") : str[i];
			element.append(newLetter);
		}
	}



	function randomStartOffset(min, max) {
		return min + (Math.random() * (max - min));
	}


	return {
		transition: transition,
		string: string
	};
}]);