// demo server
const server = require('./server/');
const config = require('./config/');
const routes = require('./routes/');

server.use( '/auth' , routes.auth );
server.use( '/team' , routes.team );

server.use( '/dialog' , routes.dialog );

server.use( '/user' , routes.user );
server.use( '/wall' , routes.wall );
server.use( '/settings' , routes.settings );

server.use( '/task' , routes.task );
server.use( '/response' , routes.response );
server.use( '/review' , routes.review );
server.use( '/team' , routes.team );

server.use( '/users' , routes.users );
server.use( '/agents' , routes.agents );

server.listen(config.port);

console.log('\n> Listening at http://localhost:' + config.port + '\n');
