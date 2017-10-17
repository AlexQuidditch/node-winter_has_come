// demo server
const server = require('./server/');
const config = require('./config/');
const routes = require('./routes/');

server.use( '/user' , routes.user );
server.use( '/task' , routes.task );
server.use( '/settings' , routes.settings );
server.use( '/team' , routes.team );
server.use( '/review' , routes.review );
server.use( '/auth' , routes.auth );
server.use( '/wall' , routes.wall );
server.use( '/upload' , routes.upload );

server.listen(config.port);

console.log('\n> Listening at http://localhost:' + config.port + '\n');
