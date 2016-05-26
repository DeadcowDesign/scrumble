/**
 * Test for the checkType untility.
 * @type {[type]}
 */
var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var tagBuilder = require("../../utilities/tagBuilder");


describe("tagBuilder", function () {

	it("should wrap content in a well formed HTML 5 tag", function () {

		var tag = tagBuilder.generateMarkup("p", [], "This is a test");
		expect(tag).to.equal("<p>This is a test</p>");
	});

	it("should understand self closing tags", function () {
		var tag = tagBuilder.generateMarkup("br");
		expect(tag).to.equal("<br>");
	});

	it("should accept a hash of parameters", function () {
		var params = [];
		params['class'] = "testClass";
		params['id'] = "testId";
		params['data-test'] = 'testData';

		var tag = tagBuilder.generateMarkup("div", params, "This is some test content");

		expect(tag).to.equal("<div class=\"testClass\" id=\"testId\" data-test=\"testData\">This is some test content</div>");
	});

	it("should reject non-hashed parameters", function () {
		expect(function () { tagBuilder.generateMarkup("p", "test", "moretest").buildTag(); }).to.throw(Error, "Parmeter 'params' must be an Array");
	});
});