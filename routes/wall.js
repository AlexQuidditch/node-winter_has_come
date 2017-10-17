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
	WallModel.findById( req.params.id , ( error , wrapper ) => {
		if ( error ) {
			res.status( 404 ).send( error );
		} else {
			return res.status( 200 ).send( wrapper.posts );
		}
	});
});

server.post( '/:wallID/create-post' , ( req , res ) => {
	WallModel.findById( req.params.wallID , ( error , wrapper ) => {
		if ( error ) {
			res.status( 500 ).send( error );
		} else {
			
			const newPost = { authorID , time , content , attacments , likes , reposts , comments } = req.body;
			const Post = Object.assign( new PostModel() , newPost );
			
			wrapper.posts.unshift( Post );
			wrapper.save( ( err , wrapper ) => {
				if ( err ) {
					res.status( 500 ).send( err )
				}
				console.log( wrapper );
				return res.status( 200 ).send( wrapper );
			});
		}
	})
});

server.post( '/:wallID/edit-post/:postID' , ( req , res ) => {
	console.log( req.body );
	WallModel.findById( req.params.wallID , ( err  , wrapper ) => {
		if ( !wrapper ) {
			return res.status(404).send({ error : 'Wall not found! Recreate profile!' });
		}
		if ( !err ) {
			wrapper.posts.find( post => {
				if ( post._id == req.params.postID && Object.keys( req.body ) == 'like' ) {
					const isLiked = post.likes.some( likeID => likeID == req.body.like );
					if ( isLiked ) {
						let i = post.likes.indexOf( req.body.like );
						post.likes.splice( i , 1 );
						return wrapper.save()
							.then( response => res.status( 200 ).send( post.likes ) )
							.catch( error => console.error(error) );
					} else {
						post.likes.push( req.body.like );
						wrapper.save()
							.then( response => res.status( 200 ).send( post.likes ) )
							.catch( error => console.error(error) );
					}
				}
			});
			// wrapper.save()
			// 	.then( response => res.status( 200 ).send( currentPost.likes ) )
			// 	.catch( error => console.error(error) );
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
