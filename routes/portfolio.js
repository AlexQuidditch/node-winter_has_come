const express = require('express');
const server = express();
const PortfolioModel = require('../models/portfolio').PortfolioModel;

server.post( '/' , ( req , res ) => {
	console.log( req.params );
	res.json( req.body );
});

server.post( '/create' , ( req , res ) => {
	const portfolio = new PortfolioModel({
		id , title , description,
		picture , likes , comments
	} = req.body);
	portfolio.save( err => {
		if ( !err ) {
			console.log('Portfolio created!');
			return res.send({ status: 'Ok!' , portfolio })
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
	PortfolioModel.findById( req.params._id , ( err , portfolio ) => {
		if ( !portfolio ) {
			res.statusCode = 404;
			return res.send({ error: 'Portfolio not found!' })
		}
		if ( !err ) {
			console.log( req.params._id );
			return res.send({ status: 'Ok!' , portfolio })
		} else {
			res.statusCode = 500;
			res.send({ error: 'Server error' })
		}
	})
});

exports.portfolio = server;
