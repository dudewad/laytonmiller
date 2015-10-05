angular.module("LMApp").directive("introAnimation", ["$rootScope",  "$timeout", "CONSTANTS", "AnimationService", function ($rootScope, $timeout, CONSTANTS, AnimationService) {
	function animate(elements, endHandler){
		var t = new TimelineMax({
			paused: true,
			onComplete: endHandler
		});

		t   .set(elements.title, {"opacity": 1})
			.set(elements.subtitle, {"opacity": 1})
			.add("start")
			.add(AnimationService.string.randomFadeIn(elements.title, 0.75, "start", 0, 1.5))
			.add(AnimationService.string.randomFadeIn(elements.subtitle, 0.75, "start", 0, 1.5))
			.addDelay(1)
			.add("emblemStart")
			.from(elements.emblem, 0.75, {"y": "-=10%", "ease": Power4.easeOut}, "emblemStart")
			.to(elements.emblem, 0.75, {"opacity": 1, "ease": Power4.easeOut}, "emblemStart")
			.addDelay(1)
			.add("out")
			.to(elements.emblem, 0.3, {"opacity": 0, "y": "-=10%", "ease": Power4.easeIn}, "out")
			.to(elements.copy, 0.3, {"opacity": 0, "y": "-=10%", "ease": Power4.easeIn}, "out")
			.addDelay(1);

		t.play();
	}



	function getEmblem(rootEl){
		return rootEl.find(".emblem");
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