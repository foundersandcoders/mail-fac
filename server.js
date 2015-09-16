var Hapi = require('hapi');

var server = new Hapi.Server();
var email = require('./email.js');

server.connection({
	port: process.env.PORT || 1337
})

server.route([
	{
	    method: 'POST',
	    path: '/',
        cors: true,
	    handler: function (request, reply) {
	        email.mandrill(request.payload.address, request.payload.message, function (error, result) {

	        	console.log('Done: ', arguments);

                if (error) {
                    return reply().code(400);
                } else {
	        	    return reply('Success!');
                }
	        });
	    }
	},
	{
	    method: 'GET',
	    path: '/',
        cors: true,
	    handler: function (request, reply) {

	    	return reply('Hello World');
	    }
	}
]);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
