const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
	cors({ origin: '*' })
);

module.exports = server;
