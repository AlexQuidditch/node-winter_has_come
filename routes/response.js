/**
 * Created by aleksey.zabaykalsky on 01.11.17.
 */

const express = require('express');
const server = express();
const ResponseModel = require('../models/response').ResponseModel;

server.post( '/' , ( req , res ) => {
	console.log( req.params );
	res.json( req.body );
});

server.post( '/add' , ( req , res ) => {
	const response = new ResponseModel({ authorID , time , content , attachments } = req.body);
	response.save( err => {
		if ( !err ) {
			console.log( 'Response created! - ' , response._id );
			return res.status( 200 ).send( response );
		} else {
			console.error(err);
			if ( err === 'ValidationError' ) {
				return res.status( 400 ).send( err );
			} else {
				return res.status( 500 ).send( err );
			}
		}
	})
});

server.get( '/get/:id' , ( req , res ) => {
	ResponseModel.findById( req.params.id , ( err , response ) => {
		if ( !response ) {
			return res.status( 404 ).send('response not found!');
		}
		if ( !err ) {
			return res.status( 200 ).send( response );
		} else {
			res.status( 500 ).send( err );
		}
	})
});

exports.response = server;