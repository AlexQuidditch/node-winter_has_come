/**
 * Created by aleksey.zabaykalsky on 03.11.17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/');

mongoose.connect(config.mongoose.uri);
const Schema = mongoose.Schema;
const defaultValues = require('mongoose-default-values');

mongoose.plugin( defaultValues, [ 'String' , 'Number' ]);

// Schemas

const Dialog = new Schema({});

const dialogModel = mongoose.model('Dialog', Dialog);

module.exports.DialogModel = dialogModel;