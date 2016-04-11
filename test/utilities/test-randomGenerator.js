/**
 * Text for the swimlane struct object.
 * @type {[type]}
 */
var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var randomStringGenerator = require("../../utilities/randomStringGenerator");

describe("randomStringGenerator", function () {

	it("should return a random string", function () {
		var output = randomStringGenerator();
		expect(output).to.be.a("string");
	});

	it("should default to a length of 64", function () {
		var output = randomStringGenerator();
		expect(randomStringGenerator()).to.be.length("64");
	});

	it("should take a length parameter which should change the output string length", function () {
		expect(randomStringGenerator(12)).to.be.length("12");
	});

	it("should throw an error if the outputLength parameter if it is not an integer", function () {

		expect(function(){randomStringGenerator("invalid");}).to.throw(Error);
		expect(function(){randomStringGenerator([]);}).to.throw(Error);
		expect(function(){randomStringGenerator({});}).to.throw(Error);
		expect(function(){randomStringGenerator(13.5);}).to.throw(Error);
	});

});