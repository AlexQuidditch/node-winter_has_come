/**
 * Created by aleksey.zabaykalsky on 03.11.17.
 */

const express = require('express');
const server = express();
const DialogModel = require('../models/dialog').DialogModel;

server.get( '/get/all' , ( req , res ) => {
	DialogModel.find( { isAgent: true } , ( err , agents ) => {
		if ( !agents ) {
			return res.status( 404 ).send('Agent not found');
		}
		if ( !err ) {
			return res.status( 200 ).send( agents );
		} else {
			return res.status( 500 ).send( err );
		}
	})
});

exports.dialog = server;