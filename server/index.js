import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import session from 'express-session';
import mongoose from 'mongoose';
import ssr from './routes/ssr';
import typingConsole from './modules/typingConsole';
import config from './config.json';

const app = express();
const MongoStore = require('connect-mongo')(session);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client')));
app.use(favicon('../client/resources/images/favicon.ico'));
app.use(express.static('bin/public'));
app.use(session({
    name: config.session.name,
    proxy: false,
    secret: config.session.secret,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: config.session.store.collection
    }),
    cookie: {
        domain: config.session.cookie.domain,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + config.session.cookie.maxAge)
    }
}));

app.use('/*', ssr);

app.listen(config.port, () => {
    typingConsole('Wake up, Neo...\/The Matrix has you...\/Follow the white rabbit.\/', startTime => {
        console.log(`(\\__/)\n   (='.'=)\n   (")_(")\n\n   \x1b[36m%s\x1b[0m`, '+ [server] Ok, ' + config.port + ' port.');
        mongoose.connect(config.db.url, err => {
            if (err) {
                console.log('   \x1b[31m%s\x1b[0m', '+ [db] Database Connection Error:', err);
                return;
            }
            const finishTime = new Date().getTime() / 1000;
            console.log('   \x1b[32m%s\x1b[0m', '+ [db] Ok, ' + (Math.round((finishTime - startTime) * 1000) / 1000) + ' sec.\n');
        });
    });
});
