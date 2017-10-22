const express = require('express');
const server = express();
const TeamModel = require('../models/team').TeamModel;

server.post( '/' , ( req , res ) => {
	console.log( req.params );
	res.json( req.body );
});

server.post( '/create' , ( req , res ) => {
	const team = new TeamModel({
		title , town , budget ,
		skills , specialization , attached,
		description , deadline ,
		isRush , published
	} = req.body);
	team.save( err => {
		if ( !err ) {
			console.log('Team created!');
			return res.send({ status: 'Ok!' , team })
		} else {
			console.error(err);
			if ( err === 'ValidationError' ) {
				res.statusCode = 400;
				res.send({ error: 'Validation error' })
			} else {
				res.statusCode = 500;
				res.send({ error: 'Server error' })
			}
		}
	})
});

server.get( '/edit/:id' , ( req , res ) => {
	TeamModel.findById( req.params._id , ( err , team ) => {
		if ( !team ) {
			res.statusCode = 404;
			return res.send({ error: 'Teams not found!' })
		}
		if ( !err ) {
			console.log( req.params._id );
			return res.send({ status: 'Ok!' , team })
		} else {
			res.statusCode = 500;
			res.send({ error: 'Server error' })
		}
	})
});

exports.team = server;
