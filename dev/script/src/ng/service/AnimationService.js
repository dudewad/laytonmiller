angular.module("LMApp").factory("AnimationService", [function () {

	var transition = {
		pageBackground: function(element, duration, offsetLabel, offsetMin, offsetMax){
			var panels = element.find("div");
			var props = {
				"opacity": 0,
				"y": 50
			};
			return _utility.randomAnimateFrom(panels, duration, props, offsetLabel, offsetMin, offsetMax);
		}
	};



	var string = {
		randomFadeIn: function (element, duration, offsetLabel, offsetMin, offsetMax){
			_wrapLetters(element);
			var spans = element.find("span");
			spans.css("display", "inline-block");
			var props = {
				"opacity": 0,
				"y": "10"
			};
			return _utility.randomAnimateFrom(spans, duration, props, offsetLabel, offsetMin, offsetMax);
		}
	};



	var _utility = {
		randomAnimateFrom: function(elements, duration, props, offsetLabel, offsetMin, offsetMax){
			if(!props){
				throw new Error("Can't perform animation. Props object is required.");
			}

			var t = new TimelineMax();
			elements.each(function () {
				t.from($(this), duration, props, offsetLabel + "+=" + randomStartOffset(offsetMin, offsetMax));
			});
			return t;
		}
	};



	/**
	 * Wraps letters of a string in spans, skipping spaces
	 *
	 * @param element   {object}    A jQuery selection of the target string whose letters are to be wrapped.
	 */
	function _wrapLetters(element) {
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