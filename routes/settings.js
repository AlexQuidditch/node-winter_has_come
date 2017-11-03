const express = require('express');
const server = express();
const UserModel = require('../models/user').UserModel;

server.post( '/' , ( req , res ) => {
	res.end( 'Плохой план, тут же ничего нет!' );
});

server.post( '/common/:id' , ( req , res ) => {
	UserModel.findById( req.params.id , ( error , user ) => {
		if ( !user ) {
			return res.status(404).send('User not found!');
		}
		if ( !error ) {
			delete req.body.__v;
			
			user.personal.email = req.body.email || user.personal.email;
			user.personal.born = req.body.born || user.personal.born;
			user.personal.password = req.body.password || user.personal.password;
			user.personal.caption = req.body.caption || user.personal.caption;
			user.social.contacts.phone = req.body.phone || user.social.contacts.phone;
			
			user.save()
				.then( response => {
					console.log( `User settings ${ user._id } edited` );
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

server.post( '/about/:id' , ( req , res ) => {
	UserModel.findById( req.params.id , ( error , user ) => {
		if ( !user ) {
			return res.status(404).send('User not found!');
		}
		if ( !error ) {
			delete req.body.__v;
			
			user.information.specialization = req.body.specialization || user.information.specialization;
			user.information.town = req.body.town || user.information.town;
			user.information.about = req.body.about || user.information.about;
			user.information.education.place = req.body.education.place || user.information.education.place;
			user.information.education.faculty = req.body.education.faculty || user.information.education.faculty;
			user.social.contacts.vk = req.body.vk || user.social.vk;
			user.social.contacts.fb = req.body.fb || user.social.fb;
			user.social.contacts.skype = req.body.skype || user.social.skype;
			user.social.contacts.telegram = req.body.telegram || user.social.telegram;
			
			user.save()
				.then( response => {
					console.log( `User about ${ user._id } edited` );
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

server.post( '/confidential' , ( req , res ) => {
	const data = req.body;
	console.log( data );
	res.json( data );
});

server.post( '/payments' , ( req , res ) => {
	const data = req.body;
	console.log( data );
	res.json( data );
});

exports.settings = server;
