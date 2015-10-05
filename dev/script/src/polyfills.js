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