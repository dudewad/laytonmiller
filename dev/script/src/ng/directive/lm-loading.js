angular.module("LMApp").directive("lmLoading", ["$rootScope", "$timeout", function ($rootScope, $timeout) {
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
					draw: true,
					startPos: Math.PI * -0.5,
					endPos: Math.PI * 1.5,
					range: 0,
					currentFrame: 0,
					duration: 60 //frames
				}
			};
			circle.animation.range = circle.animation.endPos - circle.animation.startPos;



			scope.start = function () {
				reset();
				if(scope.state.loading && !raf){
					animate();
				}
			};



			scope.stop = function () {
				window.cancelAnimationFrame(raf);
				raf = null;
			};



			function animate() {
				canW = canvas.width;
				canH = canvas.height;
				canvas.width = canW;
				canvas.height = canH;
				var centerX = canW / 2;
				var centerY = canH / 2;
				var startPoint;
				var endPoint;
				var animPoint = easeInOutQuint(circle.animation.currentFrame, circle.animation.startPos, circle.animation.range, circle.animation.duration);
				startPoint = circle.animation.draw ? circle.animation.startPos : animPoint;
				endPoint = circle.animation.draw ? animPoint : circle.animation.endPos;
				ctx = canvas.getContext("2d");

				ctx.beginPath();
				ctx.arc(centerX, centerY, circle.radius, startPoint, endPoint);
				ctx.lineWidth = circle.strokeWidth;
				ctx.strokeStyle = circle.stroke;
				ctx.stroke();

				if(circle.animation.currentFrame == circle.animation.duration){
					scope.stop();
					//At the end of a draw cycle, animate the emblem flash
					if(circle.animation.draw) {
						emblemIn();
					}
					//At the end of an undraw cycle, restart the animation
					else{
						circle.animation.draw = !circle.animation.draw;
						$timeout(scope.start, 1000);
					}
				}
				else {
					circle.animation.currentFrame++;
					raf = window.requestAnimationFrame(animate);
				}
			}



			function emblemIn(){
				var all = element.find(".lmIcon-emblem-no-border, canvas");
				var emblem = all.filter(".lmIcon-emblem-no-border");
				var t = new TimelineMax({
					onComplete: function(){
						reset();
						circle.animation.draw = !circle.animation.draw;
						scope.start();
					}
				});
				t   .set(emblem, {opacity: 0})
					.to(emblem, 0.15, {opacity: 1, repeat: 5, yoyo: true});
			}



			function reset(){
				canvas.width = canvas.width;
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

			scope.$watch("state.loading", function(n){
				n && scope.start();
			});
		}
	};
}]);