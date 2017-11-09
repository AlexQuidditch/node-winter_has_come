const express = require('express');
const server = express();
const UserModel = require('../models/user').UserModel;

server.get( '/:id' , ( req , res ) => {
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

server.post( '/edit/:id' , ( req , res ) => {
	UserModel.findById( req.params.id , ( error , user ) => {
		if ( !user ) {
			return res.status(404).send('User not found!');
		}
		if ( !error ) {
			delete req.body.__v;
			user = Object.assign( user , req.body ) || user;
			user.save()
				.then( response => {
					console.log( `user ${ user._id } edited` );
					return res.status( 200 ).send( response )
				})
				.catch( error => {
					console.error(error);
					return res.status( 500 ).send( error );
				});
		} else {
			console.error(error);
			return res.status(500).send('Server error')
		}
	})
});

// server.post( '/ussser' , ( req , res ) => {
// 	const common = new UserModel({ email , phone , link , bornDate , password , caption , publishEmail } = req.body);
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
// 	UserModel.findById( req.params._id , ( err , common ) => {
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
