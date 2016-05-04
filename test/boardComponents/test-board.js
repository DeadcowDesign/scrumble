var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var board = require("../../boardComponents/board");
var testBoard = new board();
var swimlane = require("../../boardComponents/swimlane");
var testSwimlane = new swimlane();

describe("board", function () {

	it("should have an id property which is an empty string", function () {

		expect(testBoard).to.have.property("id").which.is.a("string").and.is.empty;
	});

	it("should have a title property which is an empty string", function () {
		expect(testBoard).to.have.a.property("title").which.is.a("string").and.is.empty;
	});

	it("should have a teams property which is an empty array", function () {
		expect(testBoard).to.have.a.property("teams").which.is.an("array").and.is.empty;
	});

	it("should have a user property which is an empty string", function () {
		expect(testBoard).to.have.a.property("user").which.is.an("string").and.is.empty;
	});

	it("should be immutable", function () {
		expect(testBoard).to.be.sealed;
	});

	it("should add swimlanes to it's swimlanes pool", function () {
		testBoard = new board();

		testSwimlane = new swimlane();

		testSwimlane.id = "swimlaneOne";

		testBoard.addSwimlane(testSwimlane);

		expect(testBoard.swimlanes).to.include.keys("swimlaneOne");
	});

	it("should reject parameters that aren't swimlanes", function () {
		testBoard = new board();

		expect(function () {testBoard.addSwimlane(); } ).to.throw(Error, "Parameter must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane({}); } ).to.throw(Error, "Parameter must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane([]); } ).to.throw(Error, "Parameter must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane(10); } ).to.throw(Error, "Parameter must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane("str"); } ).to.throw(Error, "Parameter must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane(null); } ).to.throw(Error, "Parameter must be an instance of 'swimlane'");

	});

	it("should reject swimlanes that don't have an id", function () {
		testBoard = new board();
		
		var testSwimlane = new swimlane();

		expect(function () { testBoard.addSwimlane(testSwimlane)}).to.throw(Error, "Parameter property 'id' must not be empty");
	});

	it("should add new swimlanes in order", function () {
		testBoard = new board();

		var swimlaneOne = new swimlane();
		var swimlaneTwo = new swimlane();
		var swimlaneThree = new swimlane();

		swimlaneOne.id = "jfilby";
		swimlaneTwo.id = "mtrinder";
		swimlaneThree.id = "jdeffries";

		testBoard.addSwimlane(swimlaneOne);
		testBoard.addSwimlane(swimlaneTwo);
		testBoard.addSwimlane(swimlaneThree);

		console.log(testBoard);
		console.log(testBoard.swimlanes);

		expect(testBoard.swimlanes["jfilby"].position).to.equal(0);	
		expect(testBoard.swimlanes["mtrinder"].position).to.equal(1);
		expect(testBoard.swimlanes["jdeffries"].position).to.equal(2);

	});
});