/**
 * Created by aleksey.zabaykalsky on 02.11.17.
 */

const express = require('express');
const server = express();
const UserModel = require('../models/user').UserModel;

server.get( '/get/all' , ( req , res ) => {
	UserModel.find( { isAgent: false } , ( err , users ) => {
		if ( !users ) {
			return res.status( 404 ).send('Users not found!');
		}
		if ( !err ) {
			return res.status( 200 ).send( users );
		} else {
			return res.status( 500 ).send( err );
		}
	})
});

server.get( '/get/:id' , ( req , res ) => {
	UserModel.findById( req.params.id , ( error , user ) => {
		if ( !user ) {
			return res.status(404).send('User not found!');
		}
		if ( !error ) {
			return res.status(200).send(user);
		} else {
			console.error(error);
			return res.status(500).send('Server error')
		}
	})
});

exports.users = server;