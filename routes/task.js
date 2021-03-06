const express = require('express');
const server = express();
const TaskModel = require('../models/task').TaskModel;
const DraftModel = require('../models/draft').DraftModel;

server.post( '/' , ( req , res ) => {
	console.log( req.body );
	res.json( req.body );
});

server.post( '/create' , ( req , res ) => {
	const task = new TaskModel({
		title , town , budget ,
		skills , specialization , attached,
		description , deadline ,
		isRush , published
	} = req.body);
	task.save( err => {
		if ( !err ) {
			console.log( 'Task created! - ' , task._id );
			return res.status(200).send(task);
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

server.post( '/save-draft' , ( req , res ) => {
	const draft = new DraftModel({
		title , town , budget ,
		skills , specialization , attached,
		description , deadline ,
		isRush
	} = req.body);
	draft.save( err => {
		if ( !err ) {
			console.log( 'Draft created! -' + draft._id );
			return res.status(200).send(draft)
		} else {
			console.error(err);
			if ( err === 'ValidationError' ) {
				res.status(400).send({ error: 'Validation error' })
			} else {
				res.status(500).send({ error: 'Server error' })
			}
		}
	})
});

server.get( '/get/all' , ( req , res ) => {
	TaskModel.find( {} , ( err , tasks ) => {
		if ( !tasks ) {
			return res.status(404).send('Tasks not found!');
		}
		if ( !err ) {
			return res.status(200).send(tasks);
		} else {
			return res.status(500).send(err);
		}
	})
});

server.get( '/get/:id' , ( req , res ) => {
	TaskModel.findById( req.params.id , ( err , task ) => {
		if ( !task ) {
			return res.status( 404 ).send({ error: 'Task not found!' });
		}
		if ( !err ) {
			return res.status( 200 ).send( task );
		} else {
			res.status( 500 ).send(err);
		}
	})
});

server.post( '/edit/:id' , ( req , res ) => {
	TaskModel.findById( req.params.id , ( err , task ) => {
		if ( !task ) {
			return res.status(404).send('Tasks not found!')
		}
		if ( !err ) {
			// delete req.body.__v;
			task = Object.assign( task , req.body ) || task;
			task.save()
				.then( task => {
					console.log( `Task ${ task._id } edited` );
					return res.status( 200 ).send( task )
				})
				.catch( error => {
					console.error(error);
					return res.status( 500 ).send( error );
				});
		} else {
			res.status(500).send('Server error')
		}
	})
});

exports.task = server;
