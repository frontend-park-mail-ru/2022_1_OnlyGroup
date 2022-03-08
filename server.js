import {createServer} from 'http';
import {readFile} from 'fs';
import pkg from 'mime';
import {appPages, appPagesPatterns, subDomains} from './public/urls.js';
const {getType} = pkg;

const port = 3000;
const ip = 'localhost';

const appRootDir = 'public';
const indexHTML = 'index.html';

const CORS = '*';

const server = createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', CORS);
        res.end();
        return;
    }

    let path = req.url;
    console.log('request path', path);
    if (appPages.indexOf(path) !== -1) {
        path = indexHTML;
    }

    appPagesPatterns.forEach((pattern) => {
        if (path === 'index.html') {
            return;
        }

        if (pattern.test(path)) {
            path = indexHTML;
        }
    });

    for (const domain in subDomains) {
        if (path.startsWith(subDomains[domain])) {
            path = path.slice(subDomains[domain].length);
            break;
        }
    }

    if (path === 'index.html') {
        path = indexHTML;
    }

    readFile(`./${appRootDir}/${path}`, (err, data) => {
        if (err) {
            data = ''; // 404 page
        }

        res.setHeader(
            'Content-Type',
            getType(path.slice(path.lastIndexOf('.') + 1)),
        );

        res.write(data);
        res.end();
    });
});

console.log(`Listening on http://${ip}:${port}`);
server.listen(port, ip);

