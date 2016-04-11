/**
 * swimlaneStruct - is an empty struct object describing the
 * data for a swimlane. A struct is an immutable object (properties
 * cannot be added or removed). A struct must contain NO functional
 * code.
 *
 * @package scrumble
 * @author James Filby <jim@deadcowdesign.co.uk>
 * @since  1.0.0
 * @return {}
 */
function ticketStruct () {
	this.id            = "";
	this.title         = "";
	this.position      = "";
	this.tickets       = [];

	Object.seal(this);
}

module.exports = ticketStruct;