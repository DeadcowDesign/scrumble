var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var swimlaneInteractor = require("../../interactors/swimlaneInteractor");
var swimlaneStruct = require("../../structs/swimlaneStruct");
var randomGenerator = require("../../utilities/randomStringGenerator");
var ticketStruct = require('../../structs/ticketStruct');

describe("swimlaneInteractor", function () {

	it("should reject a param that isn't a swimlane", function () {

		var notSwimlane = {};
		var ticket = new ticketStruct();

		expect(function() { swimlaneInteractor.addTicket(notSwimlane, ticket); }).to.throw(Error, "First parameter 'swimlane' must be of type 'swimlaneStruct'");
	});

	it("should reject tickets that arent of type ticketStruct", function () {

		var swimlane = new swimlaneStruct();
		var ticket = {};
		ticket.id = randomGenerator();

		expect(function () {swimlaneInteractor.addTicket(swimlane, ticket); }).to.throw(Error, "Second parameter 'ticket' must be of type 'ticketStruct'");
	});

	it("should reject tickets that don't their 'id' property set", function () {

		var swimlane = new swimlaneStruct();
		var ticket = new ticketStruct();

		expect(function() {swimlaneInteractor.addTicket(swimlane, ticket); } ).to.throw(Error, "Second parameter 'ticket' must have the property 'id' set");
	});

	it("should add a ticket to a swimlane", function () {

		var swimlane = new swimlaneStruct();
		var ticket = new ticketStruct();
		ticket.id = randomGenerator();

		var ticket2 = new ticketStruct();
		ticket2.id = randomGenerator();

		swimlaneInteractor.addTicket(swimlane, ticket);
		swimlaneInteractor.addTicket(swimlane, ticket2);

		expect(ticket).to.equal(swimlane.tickets[ticket.id]);
	});

	it("should remove a ticket from a swimlane", function () {
		
		var swimlane = new swimlaneStruct();
		var ticket = new ticketStruct();
		var notSwimlane = {};
		var notTicket = {};

		expect(function() {swimlaneInteractor.removeTicket(notSwimlane, ticket);}).to.throw(Error, "First parameter 'swimlane' must be of type 'swimlaneStruct'");
		expect(function () {swimlaneInteractor.removeTicket(swimlane, notTicket); }).to.throw(Error, "Second parameter 'ticket' must be of type 'ticketStruct'");

		expect(function () {swimlaneInteractor.removeTicket(swimlane, ticket); }).to.throw(Error, "Second parameter 'ticket' must have the property 'id' set");

		ticket.id = randomGenerator();
					
		expect(swimlaneInteractor.removeTicket(swimlane, ticket)).to.be.false;

		swimlaneInteractor.addTicket(swimlane, ticket);
		
		expect(ticket).to.equal(swimlane.tickets[ticket.id]);

		swimlaneInteractor.removeTicket(swimlane, ticket);

		expect(swimlane.tickets[ticket.id]).to.be.undefined;
	});

	it('should move a ticket from one swimlane to another', function () {

		var swimlaneFrom  = new swimlaneStruct();
		var swimlaneTo    = new swimlaneStruct();
		var ticket        = new ticketStruct();
		var notSwimlane   = {};
		var notTicketId   = null;
		var missingTicket = randomGenerator();
		var targetId      = null;

		swimlaneFrom.id = randomGenerator();
		swimlaneTo.id   = randomGenerator();
		ticket.id       = randomGenerator();
		targetId        = ticket.id;

		swimlaneInteractor.addTicket(swimlaneFrom, ticket);

		expect(function () {swimlaneInteractor.moveTicket(notSwimlane, swimlaneTo, targetId)}).to.throw(Error, "First parameter 'swimlaneFrom' must be of type 'swimlaneStruct'");
		expect(function () {swimlaneInteractor.moveTicket(swimlaneFrom, notSwimlane, targetId)}).to.throw(Error, "Second parameter 'swimlaneTo' must be of type 'swimlaneStruct'");
		expect(function () {swimlaneInteractor.moveTicket(swimlaneFrom, swimlaneTo, notTicketId)}).to.throw(Error, "Third parameter 'targetId' must be of type 'string'");
		expect(function () {swimlaneInteractor.moveTicket(swimlaneFrom, swimlaneTo, missingTicket)}).to.be.undefined;

		expect( swimlaneInteractor.moveTicket(swimlaneFrom, swimlaneTo, targetId)).to.be.true;
		
		console.log(swimlaneFrom);
		console.log(swimlaneTo);
		
		expect(swimlaneInteractor.getTicket(swimlaneFrom, targetId)).to.be.undefined;
		expect(swimlaneInteractor.getTicket(swimlaneTo, targetId)).to.equal.ticket;


	});

	it("should get a ticket from it's ticket pool", function () {
		var swimlane = new swimlaneStruct();
		var ticket   = new ticketStruct();
		var ticket2  = new ticketStruct();
		var testId   = randomGenerator();
		var notTicketId = 01;
		var notSwimlane = {};

		ticket.id   = testId;
		ticket.user = "jfilby";

		ticket2.id   = randomGenerator();
		ticket2.user = "mtrinder";

		swimlaneInteractor.addTicket(swimlane, ticket);

		swimlaneInteractor.addTicket(swimlane, ticket2);

		var ticketOut = swimlaneInteractor.getTicket(swimlane, testId);

		expect(function () { swimlaneInteractor.getTicket(notSwimlane, testId); }).to.throw(Error, "First parameter 'swimlane' must be of type 'swimlaneStruct'");
		expect(function () { swimlaneInteractor.getTicket(swimlane, notTicketId); }).to.throw(Error, "Second parameter 'ticketId' must be a string");
		expect(swimlaneInteractor.getTicket(swimlane, "notAnId")).to.be.undefined;

		expect(ticketOut.user).to.equal("jfilby");
	});

});