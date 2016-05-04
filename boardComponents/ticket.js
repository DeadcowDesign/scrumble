/**
 * ticket - describes the properties and methods of a ticket
 *
 * @package scrumble
 * @author James Filby <jim@deadcowdesign.co.uk>
 * @since  1.2.0
 * @return {}
 */
function ticket () {
	this.id          = "";
	this.user        = "";
	this.title       = "";
	this.description = "";
	this.notes       = "";
	this.swimlane    = "";
	
	Object.seal(this);
}

ticket.prototype = {

	constructor: ticket,
};

module.exports = ticket;