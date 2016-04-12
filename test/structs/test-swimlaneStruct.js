/**
 * Text for the swimlane struct object.
 * @type {[type]}
 */
var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var swimlaneStruct = require("../../structs/swimlaneStruct");
var swimlane = new swimlaneStruct();

describe("swimlaneStruct", function () {

	it("should have an id property", function () {
		expect(swimlane).to.have.property("id").which.is.a("string").and.is.empty;
	});

	it("should have a title property which should be an empty string", function () {
		expect(swimlane).to.have.property("title").which.is.a("string").and.is.empty;
	});

	it("should have a position property which should be an integer ", function () {
		expect(swimlane).to.have.property("position").which.is.a("number");
	});

	it("should have a tickets property which should be an empty array", function () {
		expect(swimlane).to.have.property("tickets").which.is.an("array").and.is.empty;
	});

	it("should be immutable", function () {
		expect(swimlane).to.be.sealed;
	});
});
