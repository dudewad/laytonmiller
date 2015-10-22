angular.module("LMApp").factory("AnimationService", [function () {

	var transition = {
		pageBackground: function(element, duration, offsetLabel, offsetMin, offsetMax){
			var panels = element.find("div");
			return utility.randomFadeIn(panels, duration, offsetLabel, offsetMin, offsetMax);
		}
	};



	var string = {
		randomFadeIn: function (element, duration, offsetLabel, offsetMin, offsetMax){
			wrapLetters(element);
			var spans = element.find("span");
			return utility.randomFadeIn(spans, duration, offsetLabel, offsetMin, offsetMax);
		}
	};



	var utility = {
		randomFadeIn: function(elements, duration, offsetLabel, offsetMin, offsetMax){
			var t = new TimelineMax();
			elements.each(function () {
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