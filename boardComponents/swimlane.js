/**
 * swimlaneStruct - is an empty struct object describing the
 * data for a swimlane. A struct is an immutable object (properties
 * cannot be added or removed). A struct must contain NO functional
 * code.
 *
 * @package scrumble
 * @author James Filby <jim@deadcowdesign.co.uk>
 * @since  1.2.0
 * @return {}
 */
//var checkType = require('../utilities/checkType');
/**
 * swimlaneStruct - define the swimlane's properties using it's constructor method
 * @return {[type]} [description]
 */
function swimlane () {
	this.id            = "";
	this.title         = "";
	this.position      = 0;
	this.tickets       = [];

	Object.seal(this);
}

/**
 * define the swimlane's methods, assign the constructor back
 * @type {Object}
 */
swimlane.prototype = {

	constructor: swimlane,

	checkType: require('../utilities/checkType'),
	/**
	 * addTicket - add a ticket to the swimlane.
	 * Tickets must be ticketStruct objects with a unique id.
	 * 
	 * @param {swimlaneStruct} swimlane A valid swimlaneStruct Object
	 * @param {ticketStruct}   ticket   A valid ticketStruct Object
	 */
	addTicket: function (ticket) {

		if (!this.checkType(ticket, "ticket")) {
			throw new Error("Parameter must be of type 'ticket'");
		}

		if (!ticket.id) {
			throw new Error("Parameter 'ticket' must have property 'id' set");
		}

		this.tickets.push(ticket);

		return true;
	},

	/**
	 * removeTicket - remove a ticket from the swimlane's ticket
	 * pool.
	 * 
	 * @param {swimlaneStruct} swimlane A valid swimlaneStruct object
	 * @param {ticketStruct}   ticket   A valid ticketStruct Object
	 * @return {boolean} True if the ticket was removed or false if it doesn't exist.
	 */
	removeTicket: function (ticketId) {


		if (!this.checkType(ticketId, "string")) {

			throw new Error("Parameter must be of type 'string'");
		}

		for (var i = 0; i < this.tickets.length; i++) {
			if (this.tickets[i].id === ticketId) {
				this.tickets.splice(i,1);
			}
		}

		return true;
	},

	/**
	 * moveTicket - move a ticket 
	 */
	moveTicket: function (ticketId, swimlaneTo) {

		if (!this.checkType(swimlaneTo, "swimlane")) {
			throw new Error("Second parameter 'swimlaneTo' must be of type 'swimlane'");
		}

		if (!this.checkType(ticketId, "string")) {
			throw new Error("First parameter 'ticketId' must be of type 'string'");
		}

		var targetTicket = this.getTicket(ticketId);

		if (!this.checkType(targetTicket, "ticket")) {
			return undefined;
		}

		try {
			swimlaneTo.addTicket(targetTicket);

		} catch (err) {

			throw new Error(err);
		}

		try {
			this.removeTicket(targetTicket.id);

		} catch (err) {

			throw new Error(err);
		}

		return true;
	},

	/**
	 * getTicket - get a ticket from the tickets pool
	 * @type {Object}
	 */
	getTicket: function (ticketId) {
		
		if (!this.checkType(ticketId, "string")) {
			throw new Error ("Parameter must be a string");
		}

		for (var i = 0; i < this.tickets.length; i++) {
			if (this.tickets[i].id === ticketId) {
				return this.tickets[i];
			}
		}

		return undefined;
	}
};

module.exports = swimlane;