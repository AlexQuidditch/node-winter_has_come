const express = require('express');
const server = express();

server.post( '/' , ( req , res ) => {
	res.end( 'Плохой план, тут же ничего нет!' );
});

server.post( '/common' , ( req , res ) => {
	const data = req.body;
	console.log( data );
	res.end( `Привет, ${ data.name } ${ data.sename }!` );
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
