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

const Task = new Schema({
	authorID: {
		type: String
	},
	engagedID: {
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
	skills: {
		type: String
	},
	specialization: {
		type: Array
	},
	attached: {
		type: Array
	},
	published: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String
	},
	budget: {
		type: String
	},
	isAgreement: {
		type: Boolean
	},
	deadline: {
		type: Date
	},
	isRush: {
		type: Boolean
	},
	views: {
		type: Number
	},
	response: {
		type: Number
	},
	isEngaged: {
		type: Boolean
	},
	completed: {
		rate: Number,
		status: String,
		review: String
	}
});

// validation
// Task.path('title').validate( value => value.length > 5 && value.length < 70 );

const TaskModel = mongoose.model('Task', Task);

module.exports.TaskModel = TaskModel;
