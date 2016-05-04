/**
 * Text for the swimlane struct object.
 * @type {[type]}
 */
var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var swimlane = require("../../boardComponents/swimlane");
var ticket = require("../../boardComponents/ticket");

var testSwimlane = new swimlane();

describe("swimlane", function () {

	it("should have an id property", function () {
		expect(testSwimlane).to.have.property("id").which.is.a("string").and.is.empty;
	});

	it("should have a title property which should be an empty string", function () {
		expect(testSwimlane).to.have.property("title").which.is.a("string").and.is.empty;
	});

	it("should have a position property which should be an integer ", function () {
		expect(testSwimlane).to.have.property("position").which.is.a("number");
	});

	it("should have a tickets property which should be an empty array", function () {
		expect(testSwimlane).to.have.property("tickets").which.is.an("array").and.is.empty;
	});

	it("should be immutable", function () {
		expect(testSwimlane).to.be.sealed;
	});

	it("should add new tickets to it's ticket pool", function () {

		testSwimlane = new swimlane();

		for (var i = 0; i < 50; i++) {

			var testTicket = new ticket();

			testTicket.id = "TAMA-" + String(i);

			testSwimlane.addTicket(testTicket);

		}

		expect(testSwimlane.tickets).to.include.keys("TAMA-0", "TAMA-1", "TAMA-2", "TAMA-3");
	});

	it("should reject an invalid ticket parameter when adding a ticket", function () {
		testSwimlane = new swimlane();

		var notTicket = {};

		notTicket.id = "notaticket";

		expect(function () {testSwimlane.addTicket(notTicket); }).to.throw(Error, "Parameter must be of type 'ticket'");
	});

	it("should reject a ticket that does not have an id property when adding a ticket", function () {
		testSwimlane = new swimlane();

		var testTicket = new ticket();

		testTicket.user = "jfilby";
		testTicket.title = "TAMA-1731: Things and stuff";

		expect(function () { testSwimlane.addTicket(testTicket); }).to.throw(Error, "Parameter 'ticket' must have property 'id' set");
	});

	it("should return an existing ticket from it's ticket pool", function () {

		testSwimlane = new swimlane();

		var testTicketOne = new ticket();
		var testTicketTwo = new ticket();

		testTicketOne.id = "jfilby";
		testTicketOne.user = "jfilby";
		testTicketTwo.id = "mtrinder";
		testTicketTwo.user = "mtrinder";

		testSwimlane.addTicket(testTicketOne);
		testSwimlane.addTicket(testTicketTwo);

		var resultTicket = testSwimlane.getTicket("jfilby");

		expect(resultTicket.user).to.equal("jfilby");

		resultTicket = testSwimlane.getTicket("mtrinder");

		expect(resultTicket.user).to.equal("mtrinder");
	});

	it("return undefined if a ticket is not defined when using getTicket", function () {
		testSwimlane = new swimlane();

		expect(testSwimlane.getTicket("jfilby")).to.be.undefined;
	});

	it("should reject unexpected parameter values in getTicket", function () {
		testSwimlane = new swimlane();

		expect(function () {testSwimlane.getTicket(10); }).to.throw(Error, "Parameter must be a string");
		expect(function () {testSwimlane.getTicket({}); }).to.throw(Error, "Parameter must be a string");
		expect(function () {testSwimlane.getTicket([]); }).to.throw(Error, "Parameter must be a string");
		expect(function () {testSwimlane.getTicket(null); }).to.throw(Error, "Parameter must be a string");
		expect(function () {testSwimlane.getTicket(); }).to.throw(Error, "Parameter must be a string");

	});

	it("should remove an existing ticket from it's ticket pool", function () {

		testSwimlane = new swimlane();

		var testTicketOne = new ticket();
		var testTicketTwo = new ticket();

		testTicketOne.id = "jfilby";
		testTicketOne.user = "jfilby";
		testTicketTwo.id = "mtrinder";
		testTicketTwo.user = "mtrinder";

		testSwimlane.addTicket(testTicketOne);
		testSwimlane.addTicket(testTicketTwo);

		testSwimlane.removeTicket("jfilby");

		expect(testSwimlane.getTicket("jfilby")).to.be.undefined;
	});

	it("should move a ticket from one swimlane to another", function () {
		var testSwimlaneOne = new swimlane();
		var testSwimlaneTwo = new swimlane();

		testTicket = new ticket();

		testTicket.id = "jfilby";
		testTicket.user = "jfilby";
		testTicket.title = "TAMA-1234: Testing";

		testSwimlaneOne.addTicket(testTicket);

		testSwimlaneOne.moveTicket("jfilby", testSwimlaneTwo);

		expect(testSwimlaneTwo.tickets).to.include.keys("jfilby");
	});
});
