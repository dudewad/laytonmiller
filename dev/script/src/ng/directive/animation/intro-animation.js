angular.module("LMApp").directive("introAnimation", ["$rootScope",  "$timeout", "CONSTANTS", function ($rootScope, $timeout, CONSTANTS) {
	function animate(elements, endHandler){
		wrapLetters(elements.title);
		wrapLetters(elements.subtitle);
		var t = new TimelineMax({
			paused: true,
			onComplete: endHandler
		});
		var titleSpans = elements.title.find("span");
		var subtitleSpans = elements.subtitle.find("span");

		t.set(elements.title, {"opacity": 1});
		t.set(elements.subtitle, {"opacity": 1});
		t.add("start");

		titleSpans.each(function(){
			t.from($(this), 0.75, {"opacity": 0}, "start+=" + letterStartOffset());
		});

		subtitleSpans.each(function(){
			t.from($(this), 0.75, {"opacity": 0}, "start+=" + letterStartOffset());
		});

		t   .add("emblemStart")
			.from(elements.emblem, 0.75, {"y": "-=10%", "ease": Power4.easeOut}, "emblemStart")
			.to(elements.emblem, 0.75, {"opacity": 1, "ease": Power4.easeOut}, "emblemStart")
			.addDelay(2)
			.add("out")
			.to(elements.emblem, 0.3, {"opacity": 0, "y": "-=10%", "ease": Power4.easeIn}, "out")
			.to(elements.copy, 0.3, {"opacity": 0, "y": "-=10%", "ease": Power4.easeIn}, "out")
			.addDelay(1.5);

		t.play();
	}



	function letterStartOffset(){
		return (Math.random() * 1.5);
	}



	function getEmblem(rootEl){
		return rootEl.find(".emblem");
	}



	function wrapLetters(element){
		var str = element.text();
		element.html("");
		for (var i = 0; i < str.length; i++) {
			var letter = str[i];
			element.append("<span>" + letter + "</span>");
		}
	}



	return {
		scope: true,
		restrict: "A",
		link: function (scope, element, attrs) {
			var elements = {
				emblem: null,
				title: "",
				subtitle: ""
			};

			var animationEndHandler = function(){
				scope.$emit(CONSTANTS.EVENT.ANIMATION.INTRO_COMPLETE);
			};

			//Force digest to complete
			$timeout(function(){
				t = new TimelineMax();
				elements.emblem = getEmblem(element);
				elements.copy = element.find(".copy");
				elements.title = element.find("h1");
				elements.subtitle = element.find("h2");

				if(!elements.emblem.length){
					$rootScope.$on("$includeContentLoaded", function(){
						elements.emblem = getEmblem(element);
						animate(elements, animationEndHandler);
					});
				}
				else {
					animate(elements, animationEndHandler);
				}
			}, 0);
		}
	};
}]);