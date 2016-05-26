var express = require('express');
var app = express();

var randomString = require('./utilities/randomStringGenerator');
var boardComponent = require('./boardComponents/board');
var swimlaneComponent = require('./boardComponents/swimlane');
var ticketComponent = require('./boardComponents/ticket');

var tag = require('./utilities/tagBuilder');

var swimlane = new swimlaneComponent();

for(var i = 0; i < 10; i++) {
	var ticket = new ticketComponent();

	ticket.id = randomString();
	ticket.title = "test";
	ticket.description = "test";

	swimlane.addTicket(ticket);
}

console.log(swimlane);

app.get('/', function (req, res) {

	res.send(JSON.stringify(swimlane));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});