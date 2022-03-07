const http = require('http');
const fs = require('fs');
const mime = require('mime');

const port = 3000;
const ip = 'localhost';

const noBuilder = true;

const appRootDir = 'public';
const indexHTML = 'index.html';

const CORS = '*';

const appPages = [
    '/',
    '/profile',
    '/profile/settings',
    '/login',
    '/registration',
];

const appPagesPatterns = [
    /^\/profile\/([\w0-9_\-%&=\?\+]+)$/,
];

const subDomains = [
    '/profile/',
];

const server = http.createServer((req, res) => {
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

    fs.readFile(`./${appRootDir}/${path}`, (err, data) => {
        if (err) {
            data = ''; // 404 page
        }

        res.setHeader(
            'Content-Type',
            mime.getType(path.slice(path.lastIndexOf('.') + 1)),
        );

        res.write(data);
        res.end();
    });
});

console.log(`Listening on http://${ip}:${port}`);
server.listen(port, ip);

