/**
 * Created by aleksey.zabaykalsky on 14.10.17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
	filename: {
		type: String,
		required: true
	},
	originalname: {
		type: String,
		required: true
	}
}, {timestamps: true})

const ImageModel = mongoose.model('Image', Image);

module.exports.ImageModel = ImageModel;