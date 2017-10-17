const express = require('express');
const server = express();
const ReviewModel = require('../models/review').ReviewModel;

server.post( '/' , ( req , res ) => {
	console.log( req.params );
	res.json( req.body );
});

server.post( '/create' , ( req , res ) => {
	const review = new ReviewModel({
		id , title , description,
		picture , likes , comments
	} = req.body);
	review.save( err => {
		if ( !err ) {
			console.log('Review created!');
			return res.send({ status: 'Ok!' , review })
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
	ReviewModel.findById( req.params.id , ( err , review ) => {
		if ( !review ) {
			res.statusCode = 404;
			return res.send({ error: 'Review not found!' })
		}
		if ( !err ) {
			console.log( req.params.id );
			return res.send({ status: 'Ok!' , review })
		} else {
			res.statusCode = 500;
			res.send({ error: 'Server error' })
		}
	})
});

exports.review = server;
