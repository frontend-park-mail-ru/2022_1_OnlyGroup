const SERVER_PORT = 3000;
import http from 'http';
import * as fs from 'fs';
import debug from 'debug';
import mime from 'mime';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const log = debug('server');

const server = http.createServer((req, res) => {
  const {url} = req;
  log('request', url);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileName = url === '/' ? 'index.html' : url;
  const filePath = `${__dirname}/public/${fileName}`;
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(302, {
        'Location': '/',
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
