/**
 * _checkType takes an subject (object, string, array, etc) and a query (
 * string representation of object type) and will test wether the two match.
 * cascades through
 * @param  {[type]} subject [description]
 * @param  {[type]} query   [description]
 * @return {[type]}         [description]
 */
function checkType (subject, query) {

	var subjectType = Object.prototype.toString.call(subject).slice(8, -1).toLowerCase();

	if (subjectType === query) {

		return true;
	}

	if (subjectType === "object" && subject.constructor.name === query) {

		return true;
	}

	return false;
}

module.exports = checkType;
