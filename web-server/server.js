const SERVER_PORT = 3000;
const http = require('http');
const fs = require('fs');
const debug = require('debug');
const path = require('path');
const dir = path.join(`${__dirname}/../components/dist`);


const log = debug('server');

const server = http.createServer((req, res) => {
    const {url} = req;
    log('request', url);

    const fileName = url === '/' ? '/mainPage.html' : url;

    function PageWriter(fileName) {

        const extname = path.extname(url);

        fs.readFile(`${dir}${fileName}`, (err, file) => {
            if(err) {
                log('error');
                res.statusCode = 404;
                console.log(`${dir}${fileName}`)
                res.end();
                return;
            }
            
            res.write(file);
            res.end();

        })};
    PageWriter(fileName)
});

server.listen(SERVER_PORT, ()=>{
    console.log(`server start at ${SERVER_PORT}`);
});