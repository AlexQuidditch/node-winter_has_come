// demo server
const server = require('./server/');
const config = require('./config/');
const routes = require('./routes/');

server.use( '/user' , routes.user );
server.use( '/settings' , routes.settings );

server.listen(config.port);

console.log('\n> Listening at http://localhost:' + config.port + '\n')
