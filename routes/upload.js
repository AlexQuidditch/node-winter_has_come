/**
 * Created by aleksey.zabaykalsky on 13.10.17.
 */

const fs = require('fs');
const path = require( 'path' );

const express = require( 'express' );
const server = express();
const multer = require( 'multer' );

const ImageModel = require( '../models/image' ).ImageModel;

const UPLOAD_PATH = path.join( process.cwd() , '/storage/uploaded' );

const upload = multer({
	dest: UPLOAD_PATH,
	limits: { fileSize: 1000000000, files: 5 }
});

// upload image
server.post( '/', upload.array( 'image', 5 ), ( req, res ) => {
	const images = req.files.map( file => {
		return { filename , originalname } = file;
	});
	ImageModel.insertMany( images, ( err, result ) => {
		if ( err ) return res.sendStatus( 404 );
		res.json( result )
	})
});

// get image with id
server.get( '/:id', ( req, res ) => {
	ImageModel.findOne( { _id : req.params.id } , ( err, image ) => {
		if ( !image ) {
			return res.status(404).send('Picture not found!')
		} else if ( err ) {
			return res.status(500).send('Internal server error')
		} else {
			fs.createReadStream( path.resolve( UPLOAD_PATH, image.filename ) ).pipe( res );
		}
	})
});

exports.upload = server;