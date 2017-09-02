// demo server

const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

server.use(
	cors({ origin: '*' })
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

server.post( '/' , ( req , res ) => {
	console.log( req.body );
	res.json( req.body );
});

server.use( '/user' , routes.user );

server.listen(port);

console.log('\n> Listening at http://localhost:' + port + '\n')
