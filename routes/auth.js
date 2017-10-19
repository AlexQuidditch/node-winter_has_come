const express = require('express');
const server = express();
const UserModel = require('../models/user').UserModel;

//POST route for updating data
server.post('/', ( req , res , next ) => {

	const { email , name , password , avatar , gender } = req.body;

  if ( email && name && password && avatar ) {

    UserModel.create( { personal : req.body } , ( error , user ) => {
      if ( error ) {
        return next( error );
      } else {
        req.session.userId = user._id;
        return res.status(200).send(user);
      }
    });

  } else if ( email && password ) {
    UserModel.authenticate( email , password , ( error , user ) => {
      if ( error || !user ) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.status(200).send(user);
      }
    });
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

server.post( '/post-registration/:userID' , ( req , res ) => {
	UserModel.findById( req.params.userID , ( error , user ) => {
		if ( error || !user ) {
			const err = new Error('User not found.');
			return res.status(404).send(err);
		} else {
			user.isAgent = req.body.isAgent || user.isAgent;
			user.personal = req.body.personal;
			user.information = req.body.information;
			user.social = req.body.social;
			user.save()
				.then( response => res.status( 200 ).send( user ) )
				.catch( error => {
					console.error(error);
					return res.status( 500 ).send( error );
				});
		}
	})
});

exports.auth = server;
