const SERVER_PORT = 3000;
import { createServer } from 'http';
import { readFile } from 'fs';
import debug from 'debug';
import pkg from 'mime';
const {getType} = pkg;

const log = debug('server');

const server = createServer((req, res) => {
    const {url} = req;
    log('request', url);

    const fileName = url === '/' ? '/index.html' : url;
    let filePath = `public${fileName}`
    console.log(filePath);
    readFile(filePath, (err, file) => {
        if(err) {
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
            return;
        }

        res.setHeader(
            'Content-Type',
            getType(filePath.slice(filePath.lastIndexOf('.') + 1)),
        );
        res.write(file);
        res.end();
    });
});

server.listen(SERVER_PORT);