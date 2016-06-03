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

	/**
	 * addSwimlane - add a new swimlane to the the board's swimlane
	 * pool
	 * 
	 * @param {object} swimlane A swimlane object
	 */
	addSwimlane: function (swimlane) {

		if (!this.checkType(swimlane, "swimlane")) {
			throw new Error("Argument must be an instance of 'swimlane'");
		}

		if (!swimlane.id || !this.checkType(swimlane.id, "string")) {
			throw new Error("Argument property 'id' must be a non-empty string");
		}

		this.swimlanes.push(swimlane);

		swimlane.position = this.swimlanes.length - 1;

		this._reorderSwimlanes();

		return this;
	},

	getSwimlane: function (swimlaneId) {

		if (!this.checkType(swimlaneId, "string")) {
			throw new Error("Argument must be a non-empty string");
		}

		for (var i = 0; i < this.swimlanes.length; i++) {

			if (this.swimlanes[i].id === swimlaneId) {
				
				return this.swimlanes[i];
			}
		}

		return undefined;
	}
	/**
	 * removeSwimlane - remove a swimlane from the boads
	 * swimlane's pool
	 * 
	 * @param  {swimlaneId} swimlaneId The id of the swimlane to remove.
	 * @return {[type]}            [description]
	 */
	removeSwimlane: function (swimlaneId) {

		if (!this.checkType(swimlaneId, "string") || !swimlaneId) {
			throw new Error("Argument 'swimlaneId' must be a non-empty string");
		}

		for (var i = 0; i < this.swimlanes.length -1; i++) {
			if (this.swimlanes[i].id === swimlaneId) {
				this.swimlanes.splice(i,1);
				this._reorderSwimlanes();
				this._reindexSwimlanes();
			}
		}

		return this;
	},

	/**
	 * reorderSwimlanes - reorder swimlanes based on an array of the 
	 * new order of the swimlanes.
	 * @param  {[type]} order [description]
	 * @return {[type]}       [description]
	 */
	reorderSwimlanes: function (order) {

		for (var i = 0; i < order.length; i++) {
			this.swimlanes[i].position = order[i];
		}

		this._reorderSwimlanes();

	},
	/**
	 * _reorderSwimlanes - reorder the swimlanes array in the
	 * current board, based on their position property. Internal
	 * implementation.
	 * 
	 * @return {[type]} [description]
	 */
	_reorderSwimlanes: function () {

		this.swimlanes.sort(this._sortSwimlanes);

		return this;
	},

	/**
	 * _reindexSwimlanes take the boards swimlanes and reindex their position
	 * properties based upon their position in the array.
	 * 
	 * @return {this} Self reference for method chaining.
	 */
	_reindexSwimlanes: function () {
		for (var i = 0; i < this.swimlanes.length; i++) {

			this.swimlanes[i].position = i;
		}

		return this;
	},

	_sortSwimlanes: function (a,b) {
		/* istanbul ignore next */
		if (a.position > b.position) {
			return 1;
		} else if (a.position < b.position) {
			return -1;
		} else {
			return 0;
		}
	}
};

module.exports = board;