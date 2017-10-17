/**
 * Created by aleksey.zabaykalsky on 08.10.17.
 */

const mongoose = require('mongoose');
const config = require('../config/');

mongoose.connect(config.mongoose.uri);

const db = mongoose.connection;
const Schema = mongoose.Schema;

const Comment = new Schema({
	authorID: {
		type: String
	},
	time: {
		type: String
	},
	content: {
		type: String
	},
	likes: {
		type: Array
	}
});

// validation
// Comment.path('title').validate( value => value.length > 5 && value.length < 70 );

const CommentModel = mongoose.model('Comment', Comment);

module.exports.CommentModel = CommentModel;