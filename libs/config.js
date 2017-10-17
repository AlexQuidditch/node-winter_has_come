const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: '../config/index.js' });

module.exports = nconf;
