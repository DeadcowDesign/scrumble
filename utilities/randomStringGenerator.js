/**
 * randomStringGenerator simply generates a random string.
 * Strings are alphanumeric (plus _ and - because I like 64 of things),
 * by default it will generate a string of 64 characters, but this can 
 * be overridden by passing an outputLength parameter. It's just a utility
 * function for generating test Id data.
 *
 * @package scrumble
 * @author  James Filby <jim@deadcowdesign.co.uk>
 * @since  1.0.0
 * @param  {[type]} outputLength [description]
 * @return {[type]}              [description]
 */
function randomStringGenerator (outputLength) {

	outputLength = outputLength || 64;

	if (outputLength !== parseInt(outputLength, 10)) {
		throw new Error("outputLength must be an integer");
	}

	var chrs = "abcdefghijklmnopqrstuvwkyxABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
	var output = "";

	for (var i = 0; i < outputLength; i++) {

		output += chrs.charAt(Math.floor(Math.random() * chrs.length));
	}

	return output;
}

module.exports = randomStringGenerator;