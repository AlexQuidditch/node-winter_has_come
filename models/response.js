/**
 * Created by aleksey.zabaykalsky on 01.11.17.
 */

const mongoose = require('mongoose');
const config = require('../config/');

mongoose.connect( config.mongoose.uri );

const db = mongoose.connection;
const Schema = mongoose.Schema;

const Response = new Schema({
	authorID: {
		type: String
	},
	postedAgo: {
		type: String
	},
	feedBack: {
		type: String
	},
	caption: {
		type: String
	},
	isEngage: {
		type: Boolean
	}
});

const ResponseModel = mongoose.model('Response', Response);

module.exports.ResponseModel = ResponseModel;