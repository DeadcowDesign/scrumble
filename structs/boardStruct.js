/**
 * boardStruct - is an empty struct object describing the
 * data for a board. A struct is an immutable object (properties
 * cannot be added or removed). A struct must contain NO functional
 * code.
 *
 * @package scrumble
 * @author James Filby <jim@deadcowdesign.co.uk>
 * @since  1.0.0
 * @return {}
 */
function boardStruct () {
	this.id          = "";
	this.user        = "";
	this.title       = "";
	this.teams       = [];

	Object.seal(this);
}

module.exports = boardStruct;