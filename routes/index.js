const fs = require('fs');
const path = require('path');

fs.readdirSync( __dirname ).forEach( file => {
  const route_fname = __dirname + '/' + file;
  const route_name = path.basename( route_fname, '.js');
  if( route_name !== 'index' && route_name[0] !== "." ){
    exports[route_name] = require(route_fname)[route_name];
  }
});

console.log( exports );

module.exports = exports;
