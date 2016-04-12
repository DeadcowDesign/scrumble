var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var swimlaneInteractor = require("../../interactors/swimlaneInteractor");
var swimlaneStruct = require("../../strucs/swimlaneStruct");
var randomGenerator = require("../../utilities/randomGenerator");


describe("swimlaneInteractor", function () {

	it("should add a ticket to a swimlane", function () {

		var swimlane = new swimlane();
		var id = randomGenerator();

		swimlaneInteractor.addTicket(swimlane, id);

		expect(id).to.be.one.of(swimlane.tickets);
	});

	it("should remove a ticket from a swimlane", function () {
		
		var swimlane = new swimlane();
		var id = randomGenerator();

		swimlaneInteractor.addTicket(swimlane, id);
		swimlaneInteractor.removeTicket(swimlane, id);

		expect(id).to.not.be.one.of(swimlane.tickets);
	});
});