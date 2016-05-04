/**
 * boardStruct - describes a board's properties and methods
 *
 * @package scrumble
 * @author James Filby <jim@deadcowdesign.co.uk>
 * @since  1.2.0
 * @return {}
 */
function board () {
	this.id          = "";
	this.user        = "";
	this.title       = "";
	this.teams       = [];

	Object.seal(this);
}

board.prototype = {

	constructor: board,
};

module.exports = board;