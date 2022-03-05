var app = require('./src/index.js');
var http = require('http');

const port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port);


