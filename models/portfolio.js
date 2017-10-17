const mongoose = require('mongoose');
const config = require('../config/');

mongoose.connect(config.mongoose.uri);

const db = mongoose.connection;
const Schema = mongoose.Schema;

// Schemas
const Images = new Schema({
	kind: {
		type: String,
		enum: ['thumbnail', 'detail'],
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

const Portfolio = new Schema({
	id: {
		type: Number
	},
	title: {
		type: String
	},
	description: {
		type: String
	},
	picture: {
		type: String
	},
	likes: {
		type: Number
	},
	comments: {
		type: Number
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// validation
// Task.path('title').validate( value => value.length > 5 && value.length < 70 );

const PortfolioModel = mongoose.model('Portfolio', Portfolio);

module.exports.PortfolioModel = PortfolioModel;
