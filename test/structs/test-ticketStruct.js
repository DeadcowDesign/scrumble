var chai = require("../../dist/node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var ticketStruct = require("../../dist/structs/ticketStruct");
var ticket = new ticketStruct();

describe("ticketStruct", function () {

	it("should have an id property that should be an empty string", function () {
		expect(ticket).to.have.property("id").which.is.a("string").and.is.empty;

	});

	it("shoud have a user property which should be an empty string", function () {
		expect(ticket).to.have.property("user").which.is.a("string").and.is.empty;
	});

	it("should have a title property which should be an empty string", function () {
		expect(ticket).to.have.property("title").which.is.a("string").and.is.empty;

	});

	it("should have a description property which should be an empty string", function () {
		expect(ticket).to.have.property("description").which.is.a("string").and.is.empty;
	});

	it("should have a notes property which should be an empty string", function () {
		expect(ticket).to.have.property("notes").which.is.a("string").and.is.empty;
	});

	it("should be immutable", function () {

		expect(ticket).to.be.sealed;

	});
});