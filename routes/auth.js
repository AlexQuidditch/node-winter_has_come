const express = require('express');
const server = express();
const UserModel = require('../models/user').UserModel;

//POST route for updating data
server.post('/', ( req , res , next ) => {

	const { email , name , password , avatar } = req.body;

  if ( email && name && password && avatar ) {

    const userData = { email , name , password , avatar };

    UserModel.create( { personal : userData } , ( error , user ) => {
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
        return res.send(user);
      }
    });
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

exports.auth = server;
