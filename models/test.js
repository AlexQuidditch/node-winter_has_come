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

const CommonSettings = new Schema({
	email: {
		type: String
	},
	phone: {
		type: String
	},
	link: {
		type: String
	},
	bornDate: {
		type: Date
	},
	password: {
		type: String
	},
	caption: {
		type: String
	},
	publishEmail: {
		type: Boolean
	},
	modified: {
		type: Date,
		default: Date.now
	}
});

// validation
// CommonSettings.path('title').validate( value => value.length > 5 && value.length < 70 );

const CommonSettingsModel = mongoose.model('CommonSettings', CommonSettings);

module.exports.CommonSettingsModel = CommonSettingsModel;
