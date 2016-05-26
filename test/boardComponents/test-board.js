var chai   = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var board        = require("../../boardComponents/board");
var testBoard    = new board();
var swimlane     = require("../../boardComponents/swimlane");
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

		testBoard       = new board();
		testSwimlane    = new swimlane();
		testSwimlane.id = "swimlaneOne";

		testBoard.addSwimlane(testSwimlane);

		expect(testBoard.swimlanes[0].id).to.equal("swimlaneOne");
	});

	it("should reject parameters that aren't swimlanes", function () {

		testBoard = new board();

		expect(function () {testBoard.addSwimlane(); } ).to.throw(Error, "Argument must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane({}); } ).to.throw(Error, "Argument must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane([]); } ).to.throw(Error, "Argument must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane(10); } ).to.throw(Error, "Argument must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane("str"); } ).to.throw(Error, "Argument must be an instance of 'swimlane'");
		expect(function () {testBoard.addSwimlane(null); } ).to.throw(Error, "Argument must be an instance of 'swimlane'");

	});

	it("should reject swimlanes that don't have an id or a malformed id", function () {

		testBoard = new board();
		
		var testSwimlane = new swimlane();

		expect(function () { testBoard.addSwimlane(testSwimlane)}).to.throw(Error, "Argument property 'id' must be a non-empty string");
		testSwimlane.id = {};
		expect(function () { testBoard.addSwimlane(testSwimlane)}).to.throw(Error, "Argument property 'id' must be a non-empty string");
		testSwimlane.id = [];
		expect(function () { testBoard.addSwimlane(testSwimlane)}).to.throw(Error, "Argument property 'id' must be a non-empty string");
		testSwimlane.id = 10;
		expect(function () { testBoard.addSwimlane(testSwimlane)}).to.throw(Error, "Argument property 'id' must be a non-empty string");
		testSwimlane.id = null;
		expect(function () { testBoard.addSwimlane(testSwimlane)}).to.throw(Error, "Argument property 'id' must be a non-empty string");
	});

	it("should add new swimlanes in order", function () {

		testBoard = new board();

		var swimlaneOne   = new swimlane();
		var swimlaneTwo   = new swimlane();
		var swimlaneThree = new swimlane();

		swimlaneOne.id   = "jfilby";
		swimlaneTwo.id   = "mtrinder";
		swimlaneThree.id = "jdeffries";

		testBoard.addSwimlane(swimlaneOne);
		testBoard.addSwimlane(swimlaneTwo);
		testBoard.addSwimlane(swimlaneThree);

		expect(testBoard.swimlanes[0].position).to.equal(0);	
		expect(testBoard.swimlanes[1].position).to.equal(1);
		expect(testBoard.swimlanes[2].position).to.equal(2);
	});

	it("should remove a swimlane from it's swimlanes pool, and re-index the remaining swimlanes", function () {

		testBoard = new board();

		var swimlaneOne   = new swimlane();
		var swimlaneTwo   = new swimlane();
		var swimlaneThree = new swimlane();

		swimlaneOne.id   = "jfilby";
		swimlaneTwo.id   = "mtrinder";
		swimlaneThree.id = "jdeffries";

		testBoard.addSwimlane(swimlaneOne);
		testBoard.addSwimlane(swimlaneTwo);
		testBoard.addSwimlane(swimlaneThree);

		expect(testBoard.swimlanes[0].position).to.equal(0);	
		expect(testBoard.swimlanes[1].position).to.equal(1);
		expect(testBoard.swimlanes[2].position).to.equal(2);
		
		testBoard.removeSwimlane("mtrinder");
		expect(testBoard.swimlanes[0].id).to.equal("jfilby");	
		expect(testBoard.swimlanes[1].id).to.equal("jdeffries");
	});

	it("should reject an incompatible parameter when removing a swimlane", function () {

		var testBoard = new board();

		expect( function () { testBoard.removeSwimlane({}); }).to.throw(Error, "Argument 'swimlaneId' must be a non-empty string");
		expect( function () { testBoard.removeSwimlane([]); }).to.throw(Error, "Argument 'swimlaneId' must be a non-empty string");
		expect( function () { testBoard.removeSwimlane(10); }).to.throw(Error, "Argument 'swimlaneId' must be a non-empty string");
		expect( function () { testBoard.removeSwimlane(null); }).to.throw(Error, "Argument 'swimlaneId' must be a non-empty string");
		expect( function () { testBoard.removeSwimlane(); }).to.throw(Error, "Argument 'swimlaneId' must be a non-empty string");
		expect( function () { testBoard.removeSwimlane(""); }).to.throw(Error, "Argument 'swimlaneId' must be a non-empty string");
	});

	it("should reorder swimlanes based upon an array or position values", function () {
		
		testBoard = new board();

		var swimlaneZero = new swimlane();
		var swimlaneOne  = new swimlane();
		var swimlaneTwo  = new swimlane();

		swimlaneZero.id = "zero";
		swimlaneOne.id  = "one";
		swimlaneTwo.id  = "two";

		testBoard.addSwimlane(swimlaneZero);
		testBoard.addSwimlane(swimlaneOne);
		testBoard.addSwimlane(swimlaneTwo);

		testBoard.reorderSwimlanes([2,0,1]);

		expect( testBoard.swimlanes[0].id).to.equal("one");
		expect( testBoard.swimlanes[1].id).to.equal("two");
		expect( testBoard.swimlanes[2].id).to.equal("zero");
	});
});