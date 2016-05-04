/**
 * Test for the checkType untility.
 * @type {[type]}
 */
var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var checkType = require("../../utilities/checkType");

var ticket = require("../../boardComponents/ticket");

// Test data
var testStr       = "I am a string";
var testInt       = 11;
var testArray     = [1,2,3,4];
var testObject    = {};
var testNull      = null;
var testBool      = true;
var testUndefined = undefined;
var testTicket    = new ticket();

describe("checkType", function () {

	it("should return true when passed standard javscript types string, number, array, object, boolean, null, undefined", function () {
		expect(checkType(testStr, "string")).to.be.true;
		expect(checkType(testInt, "number")).to.be.true;
		expect(checkType(testArray, "array")).to.be.true;
		expect(checkType(testObject, "object")).to.be.true;
		expect(checkType(testNull, "null")).to.be.true;
		expect(checkType(testBool, "boolean")).to.be.true;
		expect(checkType(testUndefined, "undefined")).to.be.true;
	});

	it("should check wether an object is an instance of another", function () {
		expect(checkType(testTicket, "ticket")).to.be.true;
	});

	it("should return false if the subject does not match the test", function () {
		expect(checkType(testStr, "number")).to.be.false;
	});
});