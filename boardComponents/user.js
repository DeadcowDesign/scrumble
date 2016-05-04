/**
 * user describes the methods and properties of a user.
 *
 * @package scrumble
 * @author James Filby <jim@deadcowdesign.co.uk>
 * @since  1.2.0
 * @return {}
 */
function user () {

	this.username = "";
	this.password = "";
	this.teams = [];

	Object.seal(this);
}

user.prototype = {

	constructor: user,
};

module.exports = user;