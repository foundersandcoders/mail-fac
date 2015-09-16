"use strict";

var Mailgun = require('mailgun').Mailgun;
var mailgunClient = new Mailgun(process.env.MAILGUN);

var Mandrill = require('mandrill-api');
var mandrillClient = new Mandrill.Mandrill(process.env.MANDRILL);

module.exports = {
	mailgun: emailMailgun,
	mandrill: emailMandrill
};

function emailMailgun (address, message, callback) {

	mg.sendText(address, 'contact@foundersandcoders.org', 'Website contact form', message, function (error) {
		
		if(error) {
			callback(error, undefined);
		} else {
			callback(undefined, 'Email sent');
		}
	});
}

function emailMandrill (address, message, callback) {

	m.messages.send({
		'message': {
			'from_email': email,
			'to':[{'email':'contact@foundersandcoders.org'}],
			'subject': 'Website contact form',
			'text': message
		}
	}, function (res) {

		return callback(undefined, res);
	}, function (err) {

		return callback(err, undefined);
	});
}