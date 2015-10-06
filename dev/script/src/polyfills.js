/**
 * Add a delay to a timeline. This just adds a dummy set call, but the syntax is more natural.
 *
 * @param {number} duration     Time in seconds for the delay
 * @param {string} position     The position where the delay should start (optional)
 */
TimelineLite.prototype.addDelay = function (duration, position) {
	//Defines the "delay" in the final set call
	var pos;

	//Require valid delay value (number/int)
	if (typeof duration === "undefined" || (duration !== parseFloat(duration))) {
		return this;
	}

	//No position argument will just set the delay for "now"
	if (typeof position === "undefined") {
		pos = "+=" + duration;
	}
	//Strings are labels
	else if (typeof position === "string") {
		pos = position + "+=" + duration;
	}
	//Numbers are offsets. We have to combine the duration with the position
	else if (duration === parseFloat(duration)) {
		pos = duration + position;
	}
	else {
		return this;
	}

	return this.set({}, {}, pos);
};



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());