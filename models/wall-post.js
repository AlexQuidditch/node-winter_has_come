/**
 * Created by aleksey.zabaykalsky on 08.10.17.
 */
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

const Post = new Schema({
	authorID: {
		type: String
	},
	time: {
		type: String
	},
	content: {
		type: String
	},
	attacments: {
		type: Array
	},
	likes: {
		type: Array
	},
	reposts: {
		type: Number
	},
	comments: {
		type: Array
	}
});

// validation
// Post.path('title').validate( value => value.length > 5 && value.length < 70 );

const PostModel = mongoose.model('Post', Post);

module.exports.PostModel = PostModel;
