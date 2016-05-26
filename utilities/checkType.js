/**
 * _checkType takes an subject (object, string, array, etc) and a query (
 * string representation of object type) and will test wether the two match.
 * Can also determine (for appropriate types), wether or not is empty.
 * 
 * @param  {[type]} subject [description]
 * @param  {[type]} query   [description]
 * @return {[type]}         [description]
 */
function checkType (subject, query, notEmpty) {

	notEmpty = notEmpty || false;

	var subjectType = Object.prototype.toString.call(subject).slice(8, -1).toLowerCase();

	if (subjectType === query) {

		if (notEmpty === true) {

			if (subjectType === "string" || subjectType === "array") {

				if (subject.length === 0) {

					return false;
				}
				
			} else if (subjectType === "object") {

				if (Object.getOwnPropertyNames(subject).length === 0) {
					return false;
				}

			} else {

				throw new Error("notEmpty can only apply to string, array or object literal types");
			}
		}

		return true;
	}

	if (subjectType === "object" && subject.constructor.name === query) {

		if (notEmpty === true) {

			throw new Error("notEmpty can only apply to string, array or object literal types");
		}

		return true;
	}

	return false;
}

module.exports = checkType;
