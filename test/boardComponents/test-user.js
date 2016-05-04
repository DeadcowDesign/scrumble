/**
 * Text for the swimlane struct object.
 * @type {[type]}
 */
var chai = require("../../node_modules/chai");
var assert = chai.assert;
var expect = chai.expect;

var user = require("../../boardComponents/user");
var testUser = new user();

describe("user", function () {
	it("should have a username property which should be an empty string", function () {
		expect(testUser).to.have.a.property("username").which.is.a("string").and.is.empty;
	});

	it("should have a password property which should be an empty string", function () {
		expect(testUser).to.have.a.property("password").which.is.a("string").and.is.empty;
	});

	it("should have a teams property which should be an empty array", function () {
		expect(testUser).to.have.a.property("teams").which.is.an("array").and.is.empty;
	});

	it("should be immutable", function () {
		expect(testUser).to.be.sealed;
	});
});
