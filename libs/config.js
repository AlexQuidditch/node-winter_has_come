const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: '../config/index.js' });

console.log( process.cwd() );

module.exports = nconf;
