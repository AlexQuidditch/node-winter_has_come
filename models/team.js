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

const Team = new Schema({
	id: {
		type: Number
	},
	authorID: {
		type: Number
	},
	title: {
		type: String
	},
	picture: {
		type: String
	},
	town: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String
	}
});

// validation
// Task.path('title').validate( value => value.length > 5 && value.length < 70 );

const TeamModel = mongoose.model('Team', Team);

module.exports.TeamModel = TeamModel;
