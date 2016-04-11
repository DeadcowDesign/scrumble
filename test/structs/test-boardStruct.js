var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var boardStruct = require("../../structs/boardStruct");
var board = new boardStruct();

describe("boardStruct", function () {

	it("should have an id property which is an empty string", function () {

		expect(board).to.have.property("id").which.is.a("string").and.is.empty;
	});

	it("should have a title property which is an empty string", function () {
		expect(board).to.have.a.property("title").which.is.a("string").and.is.empty;
	});

	it("should have a teams property which is an empty array", function () {
		expect(board).to.have.a.property("teams").which.is.an("array").and.is.empty;
	});

	it("should have a user property which is an empty string", function () {
		expect(board).to.have.a.property("user").which.is.an("string").and.is.empty;
	});

	it("should be immutable", function () {
		expect(board).to.be.sealed;
	});
});