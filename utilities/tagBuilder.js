
 module.exports = {

	_init: function () {

		this.params = this.params || [];
		
		if (!this.checkType(this.tag, "string") || !this.tag) {
			throw new Error("parameter 'tag' must be a non-empty string");
		} else {
			this.tag = this.tag.toLowerCase();
		}

		if (!this.checkType(this.params, "array")) {
			throw new Error("Parmeter 'params' must be an Array");
		}

		return this;
	},

	generateMarkup: function (tag, params, content) {

		this.tag = tag;
		this.params = params;
		this.content = content;
		this.checkType = require('../utilities/checkType');
		this.output = "";

		this._init();

		var output = "<" + this.tag;

		var params = this._parseParams();

		if (params) {
			output += " " + params;
		}

		output += ">";

		if (this._isSelfClosing()) {
			return output;
		}

		output += this.content + "</" + this.tag + ">";

		return output;
	},

	_parseParams: function () {

		var paramsString = false;

		if (Object(this.params).keys.length = 0) {

			return paramsString;
		}

		paramParts = [];

		for (var k in this.params) {
			paramParts.push( k + "=\"" + this.params[k] + "\"");
		}

		paramsString = paramParts.join(" ");
 
 		return paramsString;	
	},

	_isSelfClosing: function () {
		var selfClosingTest = new RegExp("\\|"+this.tag+"\\|");
		var selfClosingTags = '|area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr|';

		return selfClosingTags.match(selfClosingTest) ? true : false;
	}
};