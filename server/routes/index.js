import ssr from './ssr';

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client')));
app.use(favicon('../client/res/images/favicon.ico'));
app.use(express.static('public'));

app.use('/*', ssr);

app.listen(3000, () => {
    console.log('Hello World listening on port 3000!');
});
