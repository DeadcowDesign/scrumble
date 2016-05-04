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
	this.swimlanes   = [];

	Object.seal(this);
}

board.prototype = {

	constructor: board,

	checkType: require('../utilities/checkType'),

	addSwimlane: function (swimlane) {

		if (!this.checkType(swimlane, "swimlane")) {
			throw new Error("Parameter must be an instance of 'swimlane'");
		}

		if (!swimlane.id) {
			throw new Error("Parameter property 'id' must not be empty");
		}

		swimlane.position = Object.keys(this.swimlanes).length;

		this.swimlanes[swimlane.id] = swimlane;

		this._reorderSwimlanes();

		return this;
	},

	_reorderSwimlanes: function () {

		this.swimlanes.sort(this._sortSwimlanes);

		var keys = Object.keys(this.swimlanes);

		for (var i = 0; i < keys.length; i++) {

			this.swimlanes[keys[i]].position = i;
		}
	},

	_sortSwimlanes: function (a,b) {
		if (a.position > b.position) {
			return -1;
		} else if (a.position < b.position) {
			return 1;
		} else {
			return 0;
		}
	}
};

module.exports = board;