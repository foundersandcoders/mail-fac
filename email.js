"use strict";

var Mailgun = require('mailgun').Mailgun;
var mailgunClient = new Mailgun(process.env.MAILGUN);

var Mandrill = require('mandrill-api');
var mandrillClient = new Mandrill.Mandrill(process.env.MANDRILL);

var EMAIL = process.env.EMAIL || 'besartshyti@gmail.com';

module.exports = {
	mailgun: emailMailgun,
	mandrill: emailMandrill
};

function emailMailgun (address, message, name, callback) {
	var subject = 'Founders&Coders inquiry from ' + name;
	mailgunClient.sendText(address, EMAIL, subject, message, function (error) {
		if(error) {
			callback(error, undefined);
		} else {
			callback(undefined, 'Email sent');
		}
	});
}

function emailMandrill (address, message, name, callback) {

	mandrillClient.messages.send({
		'message': {
			'from_email': address,
			'to':[{'email': EMAIL}],
			'subject': 'Founders&Coders inquiry from ' + name,
			'text': message
		}
	}, function (res) {

		return callback(undefined, res);
	}, function (err) {

		return callback(err, undefined);
	});
}
