const express = require('express');
const server = express();
const TaskModel = require('../models/task').TaskModel;
const DraftModel = require('../models/draft').DraftModel;

server.post( '/' , ( req , res ) => {
	console.log( req.params );
	res.json( req.body );
});

server.post( '/create-task' , ( req , res ) => {
	const task = new TaskModel({
		title , town , budget ,
		skills , specialization , attached,
		description , budget , deadline ,
		isRush , published
	} = req.body);
	task.save( err => {
		if ( !err ) {
			console.log('Task created!');
			return res.send({ status: 'Ok!' , task })
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
		description , budget , deadline ,
		isRush
	} = req.body);
	draft.save( err => {
		if ( !err ) {
			console.log( 'Draft created! ' + draft );
			return res.send(draft)
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

server.get( '/get/all' , ( req , res ) => {
	TaskModel.find( {} , ( err , tasks ) => {
		if ( !tasks ) {
			return res.status(404).send({ error: 'Tasks not found!' })
		}
		if ( !err ) {
			return res.send(tasks)
		} else {
			res.statusCode = 500;
			res.send({ error: 'Server error' })
		}
	})
});

server.get( '/get/:id' , ( req , res ) => {
	TaskModel.findById( req.params.id , ( err , task ) => {
		if ( !task ) {
			res.statusCode = 404;
			return res.send({ error: 'Task not found!' })
		}
		if ( !err ) {
			return res.send(task)
		} else {
			res.statusCode = 500;
			res.send({ error: 'Server error' })
		}
	})
});

server.put( '/edit/:id' , ( req , res ) => {
	TaskModel.findById( req.params._id , ( err , task ) => {
		console.log( req.body );
		if ( !task ) {
			res.statusCode = 404;
			return res.send({ error: 'Tasks not found!' })
		}
		if ( !err ) {
			task.completed = req.body || task.completed;
			task.save((err, task) => {
				res.status(200).send(task);
			});
		} else {
			res.statusCode = 500;
			res.send({ error: 'Server error' })
		}
	})
});

exports.task = server;
