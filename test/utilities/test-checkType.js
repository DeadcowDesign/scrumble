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
		expect(checkType(testStr, "array")).to.be.false;
		expect(checkType(testStr, "object")).to.be.false;
		expect(checkType(testStr, "null")).to.be.false;
		expect(checkType(testStr, "boolean")).to.be.false;
		expect(checkType(testStr, "undefined")).to.be.false;

		expect(checkType(testInt, "string")).to.be.false;
		expect(checkType(testInt, "array")).to.be.false;
		expect(checkType(testInt, "object")).to.be.false;
		expect(checkType(testInt, "null")).to.be.false;
		expect(checkType(testInt, "boolean")).to.be.false;
		expect(checkType(testInt, "undefined")).to.be.false;

		expect(checkType(testArray, "string")).to.be.false;
		expect(checkType(testArray, "number")).to.be.false;
		expect(checkType(testArray, "object")).to.be.false;
		expect(checkType(testArray, "null")).to.be.false;
		expect(checkType(testArray, "boolean")).to.be.false;
		expect(checkType(testArray, "undefined")).to.be.false;

		expect(checkType(testObject, "string")).to.be.false;
		expect(checkType(testObject, "number")).to.be.false;
		expect(checkType(testObject, "array")).to.be.false;
		expect(checkType(testObject, "null")).to.be.false;
		expect(checkType(testObject, "boolean")).to.be.false;
		expect(checkType(testObject, "undefined")).to.be.false;

		expect(checkType(testNull, "string")).to.be.false;
		expect(checkType(testNull, "number")).to.be.false;
		expect(checkType(testNull, "array")).to.be.false;
		expect(checkType(testNull, "object")).to.be.false;
		expect(checkType(testNull, "boolean")).to.be.false;
		expect(checkType(testNull, "undefined")).to.be.false;

		expect(checkType(testBool, "string")).to.be.false;
		expect(checkType(testBool, "number")).to.be.false;
		expect(checkType(testBool, "array")).to.be.false;
		expect(checkType(testBool, "object")).to.be.false;
		expect(checkType(testBool, "null")).to.be.false;
		expect(checkType(testBool, "undefined")).to.be.false;

		expect(checkType(testUndefined, "string")).to.be.false;
		expect(checkType(testUndefined, "number")).to.be.false;
		expect(checkType(testUndefined, "array")).to.be.false;
		expect(checkType(testUndefined, "object")).to.be.false;
		expect(checkType(testUndefined, "null")).to.be.false;
		expect(checkType(testUndefined, "boolean")).to.be.false;

		expect(checkType(testTicket, "string")).to.be.false;
		expect(checkType(testTicket, "number")).to.be.false;
		expect(checkType(testTicket, "array")).to.be.false;
		expect(checkType(testTicket, "null")).to.be.false;
		expect(checkType(testTicket, "boolean")).to.be.false;
		expect(checkType(testTicket, "undefined")).to.be.false;
	});

	it("should check if a passed subject is empty on request", function () {
		var arrayObj = [];
		expect(checkType(arrayObj, "array", true)).to.be.false;

		var strObj = "";
		expect(checkType(strObj, "string", true)).to.be.false;

		var objObj = {};
		expect(checkType(objObj, "object", true)).to.be.false;

		expect(function () {checkType(testTicket, "ticket", true);} ).to.throw(Error, "notEmpty can only apply to string, array or object literal types");

		expect( function () {checkType(0, "number", true); }).to.throw(Error, "notEmpty can only apply to string, array or object literal types");
	});
});