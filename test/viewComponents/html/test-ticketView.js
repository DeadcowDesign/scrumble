/**
 * Test for the html ticketView view.
 * @type {[type]}
 */
var chai = require("../../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var ticketView = require('../../../viewComponents/html/ticketView');
var ticket = require('../../../boardComponents/ticket.js');

var testTicket = new ticket();

testTicket.id = "test";
testTicket.title = "TAMA-1234: Build Scrumble";
testTicket.user = "jfilby";
testTicket.description = "Build the scrumble app and deploy";

var emptyTicket = new ticket();

describe("ticketView", function () {
	it("shoud generate a ticket's html", function () {

		expectedOutput = '<div class="ticket" data-ticketId="test"><h2 class="ticket__title">TAMA-1234: Build Scrumble</h2><p class="ticket__description">Build the scrumble app and deploy</p><div class="ticket__notes"></div></div>';
		expect(ticketView.getView(testTicket)).to.equal(expectedOutput);
	});

	it("shoud reject non-ticket parameters", function () {
		expect(function () {ticketView.getView({}); }).to.throw(Error, "Parameter must be of type 'ticket'");
	});

	it("should reject tickets without an id", function () {

		testTicket.id = "";
		expect( function () { ticketView.getView(testTicket); }).to.throw(Error, "ticket must have property 'id' which must be a non-empty string");
	});

	it("should reject tickets without a title", function () {

		testTicket.id = "test";
		testTicket.title = "";
		expect( function () { ticketView.getView(testTicket); }).to.throw(Error, "ticket must have property 'title' which must be a non-empty string");

	});

	it("should reject tickets without a user", function () {

		testTicket.title = "TAMA-1234: Build Scrumble";
		testTicket.user = "";
		expect( function () { ticketView.getView(testTicket); }).to.throw(Error, "ticket must have property 'user' which must be a non-empty string");
	});
});
