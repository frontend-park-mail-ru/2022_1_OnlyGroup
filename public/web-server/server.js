

const express = require('express');
const path = require('path');
const pug = require('pug')
const root = path.join(`${__dirname}/../`);


const PORT = 3000;
const HOST = 'localhost';

const app = express();

app.set('view engine', 'pug'); //Подключение шаблонизатора pug
app.set('views', path.join(root+'/views'));

app.use(express.static(root)); //Определение директории статических файлов

app.get('/', (req, res) => {
    res.render('signInPage');
});

app.get('/app', (req, res) => {
    res.render('appPage');
});

app.get('/signup', (req, res) => {
    res.render(`signUpPage`);
});

app.get('*', (req, res) => {//Переадресация с несуществующего пути
    console.log(`Can't find ${path.join(req.url)}`);
    res.status(404);
    res.redirect('/');
});

app.listen(PORT, HOST, () => {
    console.log(`Server started at ${HOST}:${PORT}`);
});