angular.module("LMApp").directive("lmLoading", ["$rootScope", function ($rootScope) {
	return {
		scope: true,
		restrict: "C",
		link: function (scope, element, attrs) {
			var canvas = element.find("canvas").get(0);
			var emblem;
			var ctx;
			var canW;
			var canH;
			var raf;
			var circle = {
				radius: (canvas.width - 2) / 2,
				strokeWidth: 2,
				stroke: "#BBBBBB",
				animation:{
					startPos: Math.PI * -0.5,
					range: 0,
					currentArcValue: 0,
					currentFrame: 0,
					duration: 60 //frames
				}
			};
			circle.animation.range = Math.PI * 1.75 - circle.animation.startPos;



			scope.start = function () {
				if(!raf){
					animate();
				}
			};



			scope.stop = function () {
				window.cancelAnimationFrame(raf);
				raf = null;
				//clear();
			};



			scope.show = function(){

			};



			scope.hide = function(){

			};



			function animate() {
				canW = canvas.width;
				canH = canvas.height;
				canvas.width = canW;
				canvas.height = canH;
				var centerX = canW / 2;
				var centerY = canH / 2;
				circle.animation.currentArcValue = easeInOutQuint(circle.animation.currentFrame, circle.animation.startPos, circle.animation.range, circle.animation.duration);
				ctx = canvas.getContext("2d");

				ctx.beginPath();
				ctx.arc(centerX, centerY, circle.radius, circle.animation.startPos, circle.animation.currentArcValue);
				ctx.lineWidth = circle.strokeWidth;
				ctx.strokeStyle = circle.stroke;
				ctx.stroke();

				if(circle.animation.currentFrame == circle.animation.duration){
					scope.stop();
					emblemIn();
				}
				else {
					circle.animation.currentFrame++;
					raf = window.requestAnimationFrame(animate);
				}
			}



			function emblemIn(){
				var all = element.find(".emblem, canvas");
				var emblem = all.filter(".emblem");
				var t = new TimelineMax({
					onComplete: function(){
						reset();
						scope.start();
					}
				});
				t   .set(emblem, {opacity: 0})
					.to(emblem, 1, {opacity: 1})
					.addDelay(0.5)
					.to(all, 1, {opacity: 0});
			}



			function reset(){
				canvas.width = canvas.width;
				circle.animation.currentArcValue = 0;
				circle.animation.currentFrame = 0;
				element.find("canvas").css("opacity", 1);
			}



			/**
			 * @param currTime      {int}       Current time in milliseconds
			 *
			 * @param startVal      {float}     Start value
			 *
			 * @param delta         {float}     Final change in value (target value)
			 *
			 * @param duration      {int}       Duration of motion in milliseconds
			 *
			 * @returns {float}
			 */
			function easeInOutQuint (currTime, startVal, delta, duration) {
				currTime /= duration / 2;
				if (currTime < 1) {
					return delta / 2 * currTime * currTime * currTime * currTime * currTime + startVal;
				}
				currTime -= 2;
				return delta / 2 * (currTime * currTime * currTime * currTime * currTime + 2) + startVal;
			}

			scope.start();
		}
	};
}]);