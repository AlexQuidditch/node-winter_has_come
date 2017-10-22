const express = require('express');
const server = express();
// const CommonSettingsModel = require('../models/commonSettings').CommonSettingsModel;

server.get( '/' , ( req , res ) => {
	console.log( req.body );
	res.send( 'qwdqwdqwdqwdqwdqw' );
});

// server.post( '/ussser' , ( req , res ) => {
// 	const common = new CommonSettingsModel({ email , phone , link , bornDate , password , caption , publishEmail } = req.body);
// 	common.save( err => {
// 		if ( !err ) {
// 			console.log('Article created!');
// 			return res.send({ status: 'Ok!' , common })
// 		} else {
// 			console.error(err);
// 			if ( err === 'ValidationError' ) {
// 				res.statusCode = 400;
// 				res.send({ error: 'Validation error' })
// 			} else {
// 				res.statusCode = 500;
// 				res.send({ error: 'Server error' })
// 			}
// 		}
// 	})
// });

// server.get( '/ussser/:id' , ( req , res ) => {
// 	CommonSettingsModel.findById( req.params._id , ( err , common ) => {
// 		if ( !common ) {
// 			res.statusCode = 404;
// 			return res.send({ error: 'Article not found!' })
// 		}
// 		if ( !err ) {
// 			console.log( req.params._id );
// 			return res.send({ status : 'Ok!' , common })
// 		} else {
// 			res.statusCode = 500;
// 			res.send({ error: 'Server error' })
// 		}
// 	})
// });

exports.user = server;
