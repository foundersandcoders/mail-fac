"use strict";

var Mailgun = require('mailgun').Mailgun;
var mailgunClient = new Mailgun(process.env.MAILGUN);

var Mandrill = require('mandrill-api');
var mandrillClient = new Mandrill.Mandrill(process.env.MANDRILL);

var EMAIL = 'besartshyti@gmail.com';

module.exports = {
	mailgun: emailMailgun,
	mandrill: emailMandrill
};

function emailMailgun (address, message, callback) {

	mailgunClient.sendText(address, EMAIL, 'Website contact form', message, function (error) {

		if(error) {
			callback(error, undefined);
		} else {
			callback(undefined, 'Email sent');
		}
	});
}

function emailMandrill (address, message, callback) {

	mandrillClient.messages.send({
		'message': {
			'from_email': address,
			'to':[{'email': EMAIL}],
			'subject': 'Founders and Coders website contact form',
			'text': message
		}
	}, function (res) {

		return callback(undefined, res);
	}, function (err) {

		return callback(err, undefined);
	});
}
