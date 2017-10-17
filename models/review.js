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

const Review = new Schema({
	id: {
		type: Number
	},
	authorID: {
		type: Number
	},
	text: {
		type: String
	},
	like: {
		type: Boolean
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// validation
// Task.path('title').validate( value => value.length > 5 && value.length < 70 );

const ReviewModel = mongoose.model('Review', Review);

module.exports.ReviewModel = ReviewModel;
