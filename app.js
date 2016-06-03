var express = require('express');
var app = express();

var randomString = require('./utilities/randomStringGenerator');
var boardComponent = require('./boardComponents/board');
var swimlaneComponent = require('./boardComponents/swimlane');
var ticketComponent = require('./boardComponents/ticket');

var tag = require('./utilities/tagBuilder');

var swimlane = new swimlaneComponent();

var board = new boardComponent();

for (var j = 0; j < 5; j++) {
    var swimlane = new swimlaneComponent();
    swimlane.id = "testSwimlane" + j;

    for (var i = 0; i < 10; i++) {
    	var ticket = new ticketComponent();

    	ticket.id = "testing" + i;
        ticket.user = "jfilby";
    	ticket.title = "test";
    	ticket.description = "test";

    	swimlane.addTicket(ticket);
    }
    board.addSwimlane(swimlane);
}

console.log(board);
var swimlane = board.swimlanes[0];
console.log(swimlane);
app.get('/', function (req, res) {

	res.send(JSON.stringify(swimlane));
});

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/