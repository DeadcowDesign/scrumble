module.exports = {
	checkType: require("../../utilities/checkType"),
	tagBuilder: require("../../utilities/tagBuilder"),

	getView: function (ticket) {
 	
 		if (!this.checkType(ticket, "ticket")) {
 			throw new Error("Parameter must be of type 'ticket'");
 		}

 		if (!this.checkType(ticket.id, "string", true)) {
 			throw new Error("ticket must have property 'id' which must be a non-empty string");
 		} 		

 		if (!this.checkType(ticket.title, "string", true)) {
 			throw new Error("ticket must have property 'title' which must be a non-empty string");
 		}


 		if (!this.checkType(ticket.user, "string", true)) {
 			throw new Error("ticket must have property 'user' which must be a non-empty string");
 		}

 		view = "";

		var params = [];
		params["class"] = "ticket__title";
		var title = this.tagBuilder.generateMarkup("h2", params, ticket.title);

		params['class'] = "ticket__description";
		var description = this.tagBuilder.generateMarkup("p", params, ticket.description);

		params["class"] = "ticket__notes";
		var notes = this.tagBuilder.generateMarkup("div", params, ticket.notes);

		params['class'] = "ticket";
		params['data-ticketId'] = ticket.id;

		view += this.tagBuilder.generateMarkup("div", params, title + description + notes);

		return view;		
	}
};