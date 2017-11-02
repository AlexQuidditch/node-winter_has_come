/**
* Created by aleksey.zabaykalsky on 08.10.17.
*/

const express = require('express');
const server = express();

const WallModel = require('../models/wall-wrapper').WallModel;
const PostModel = require('../models/wall-post').PostModel;

const responseHandler = ( error , success ) => {
	if ( error ) {
		console.error( error );
	}
};

server.post( '/get/all' , ( req , res ) => {
	console.log( req.body );
	res.json( req.body );
});

server.get( '/get/:id' , ( req , res ) => {
	PostModel.findById( req.params.id , ( error , post ) => {
		if ( error ) {
			res.status( 404 ).send( error );
		} else {
			return res.status( 200 ).send( post );
		}
	});
});

server.post( '/create' , ( req , res ) => {
	const newPost = new PostModel({
		authorID , time , content ,
		attacments , likes , reposts ,
		comments
	} = req.body);
	return newPost.save()
		.then( response => res.status( 200 ).send( newPost ) )
		.catch( error => console.error(error) );
});

server.post( '/edit/:postID' , ( req , res ) => {
	PostModel.findById( req.params.postID , ( err  , post ) => {
		if ( !post ) {
			return res.status(404).send();
		}
		if ( !err ) {
			delete req.body.__v;
			const isLiked = post.likes.some( likeID => likeID == req.body.like );
			if ( isLiked ) {
				let i = post.likes.indexOf( req.body.like );
				post.likes.splice( i , 1 );
				return post.save()
					.then( response => res.status( 200 ).send( post ) )
					.catch( error => console.error(error) );
			} else {
				post = Object.assign( post , req.body ) || post;
				return post.save()
					.then( response => res.status( 200 ).send( post ) )
					.catch( error => console.error(error) );
			}
		} else {
			res.status(505).send({ error: 'Server error' })
		}
	});
	// PostModel.findById( req.params.postID , ( err , post ) => {
	// 	if ( !post ) {
	// 		res.statusCode = 404;
	// 		return res.send({ error: 'Post not found!' })
	// 	}
	// 	if ( !err ) {
	// 		if ( Object.keys( req.body ) == 'like' ) {
	// 			const isLiked = post.likes.some( likeID => likeID === req.body.like );
	// 			if ( isLiked ) {
	// 				let i = post.likes.indexOf( req.body.like );
	// 				post.likes.splice( i , 1 );
	// 			} else {
	// 				post.likes.push( req.body.like );
	// 			}
	// 		}
	// 		post.save()
	// 			.then( response => res.status( 200 ).send( response.likes ) )
	// 			.catch( error => console.error(error) );
	// 		console.log(post);
	// 	} else {
	// 		res.statusCode = 500;
	// 		res.send({ error: 'Server error' })
	// 	}
	// })
});

// server.create( 'post/' , async ( req , res ) => {
// 	try{
// 		await let wall=	WallModel.findById(req.body.wallID);
// 		if(!wall) res.status( 404 ).send( "No found" );
// 		wall.posts.push(req.body.post);
// 		await wall.save();
// 		return res.status( 200 ).send( "success" );
// 	}catch(err){
// 		haldlerError(res, 'Ошибка контрукции try');
// 	}
// });

// const haldlerError = (response, errText) =>{
// 	response.status =500;
// 	response.send({
// 		error: 'Internal server error',
// 		message: errText,
// 	});
// };

exports.wall = server;
