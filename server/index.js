const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('../config/');

mongoose.connect(config.mongoose.uri);

const db = mongoose.connection;

server.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
	cors({ origin: '*' })
);

module.exports = server;
