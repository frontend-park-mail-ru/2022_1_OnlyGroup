const SERVER_PORT = 3000;
const http = require('http');
const fs = require('fs');
const debug = require('debug');
const mime = require('mime');

const log = debug('server');

const server = http.createServer((req, res) => {
    const {url} = req;
    log('request', url);

    const fileName = url === '/' ? '/index.html' : url;
    let filePath = `${__dirname}/public/${fileName}`
    fs.readFile(`${__dirname}/public/${fileName}`, (err, file) => {
        if(err) {
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
            return;
        }

        res.setHeader(
            'Content-Type',
            mime.getType(filePath.slice(filePath.lastIndexOf('.') + 1)),
        );
        res.write(file);
        res.end();
    });
});

server.listen(SERVER_PORT);