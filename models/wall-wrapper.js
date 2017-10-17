/**
 * Created by aleksey.zabaykalsky on 08.10.17.
 */
const mongoose = require('mongoose');
const config = require('../config/');

mongoose.connect(config.mongoose.uri);

const Schema = mongoose.Schema;

const Wall = new Schema({
	posts: {
		type: Array
	}
});

const WallModel = mongoose.model('Wall', Wall);

module.exports.WallModel = WallModel;