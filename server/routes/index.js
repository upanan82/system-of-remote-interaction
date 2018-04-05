// require('dotenv').config();
// Разобраться с dotenv подключением, заменить ключи и логины на env переменные

import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import session from 'express-session';
import mongoose from 'mongoose';
import ssr from './ssr';
import signature from '../signature';

const app = express();
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://user:pass@ds231725.mlab.com:31725/sessions', err => {
    if (err) {
        console.log(' + ' + consoleColor(41), ' Database Connection Error ', err);
        return;
    }
    console.log(' + ' + consoleColor(42), ' Database is connected \n');
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client')));
app.use(favicon('../client/res/images/favicon.ico'));
app.use(express.static('public'));
app.use(session({
    name: 'user.sid',
    proxy: false,
    secret: '5lMLn10fl8VKfluJSh2N79Ph6LAKDaz4',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    }),
    cookie: {
        domain: 'localhost',
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + +'5400000')
    }
}));

app.use('/*', ssr);

app.listen(3000, () => {
    console.log(signature + '\n' + consoleColor(36), '[server] Starting server on port 3000...\n');
    console.log(' + ' + consoleColor(42), ' Server is running \n');
});

function consoleColor(ind) {
    return '\x1b[' + ind + 'm%s\x1b[0m';
}
