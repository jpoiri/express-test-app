var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

/*
var transporter = nodemailer.createTransport(smtpTransport({

host: 'smtp.mandrillapp.com',
port: 587

}));
*/


var transporter = nodemailer.createTransport({
	service: "Mandrill",
	auth: {
		user: "mandrill@medavie.bluecross.ca",
		pass: "8EhXhKQfVDh5lGp9QrtijQ"
	}
});


var locals = {
	from: 'noreply@medavie.bluecross.ca',
	to:  'herve.seger@medavie.bluecross.ca',
	subject: 'A new express email as been created',
	html: {path: './basic2.html'},
	connectionTimeout: 5000
};

//	headers: [{key: "X-MC-Autotext", value: "false"}, {key: "X-MC-AutoHtml", value: "false"}]

// create express application
app = express();

app.use(bodyParser.json()); // for parsing application/json

// default route.
app.get('/', function(req, resp) {
	resp.send("working...");
});

// Get teams
app.get('/teams', function(req, resp) {
	resp.send('Get teams');
});

// Get team.
app.get('/teams/:id?', function(req, resp) {
	resp.send('Get team:' + req.params.id);
});

// Create team.
app.post('/teams/:id', function(req, resp) {
	resp.send('Created team:' + req.params.id)
});

// Create team.
app.post('/email', function(req, resp) {
	console.log ("Send Email");

	transporter.sendMail(locals, function(error, info) {

		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
			resp.json(req.body);
		}

	});

});

// Update team
app.put('/teams/:id', function(req, resp) {
	resp.send('Updated team:' +  req.params.id);
});

// Delete all teams.
app.delete('/teams', function(req, resp) {
	resp.send('Deleted all teams');
});

// Delete a team.
app.delete('/teams/:id', function(req, resp) {
	resp.send('Delete team:' + req.params.id);
});

// handling 404 errors
app.use(function(err, req, res, next) {
	res.send(err.message || '** no unicorns here **');
});


var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port)
});
