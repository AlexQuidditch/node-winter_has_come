/**
 * Created by aleksey.zabaykalsky on 02.11.17.
 */

const express = require('express');
const server = express();
const UserModel = require('../models/user').UserModel;

server.get( '/get/all' , ( req , res ) => {
	UserModel.find( { isAgent: true } , ( err , agents ) => {
		if ( !agents ) {
			return res.status( 404 ).send('Agents not found!');
		}
		if ( !err ) {
			return res.status( 200 ).send( agents );
		} else {
			return res.status( 500 ).send( err );
		}
	})
});

exports.agents = server;