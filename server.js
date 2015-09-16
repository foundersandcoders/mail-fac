var Hapi = require('hapi');

var server = new Hapi.Server();
var email = require('./email.js');

server.connection({
	routes: { cors: true },
	port: process.env.PORT || 1337
})

server.route([
	{
	    method: 'GET',
	    path: '/email',
	    handler: function (request, reply) {

	    	if (!request.query.body) {

	    		return reply('No data provided!').code(400);
	    	} else {

		    	var address = JSON.parse(request.query.body).address;
		    	var message = JSON.parse(request.query.body).message;

		        email.mandrill(address, message, function (error, result) {

		        	console.log('Done: ', arguments);

	                if (error) {
	                    return reply('There was a problem with your email!').code(400);
	                } else {
		        	    return reply('Success!');
	                }
		        });
	    	}
	    }
	},
	{
	    method: 'GET',
	    path: '/ping',
	    handler: function (request, reply) {

	    	return reply('Hello World');
	    }
	}
]);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
