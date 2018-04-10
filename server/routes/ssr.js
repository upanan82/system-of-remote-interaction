import express from 'express';

import mongoose from 'mongoose';
import { StudentsModel } from '../modules/dbSchemas';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducers from '../../client/src/reducers/index';
import { LIST_ACTIONS } from '../../client/src/consts/action_types';
import App from '../../client/src/app.tsx';

const router = express.Router();


router.get('/', (req, res) => {
 

    // var post = new StudentsModel();
    // post.userName.push({ title: 'My comment' });
    // post.save(function (err) {
    //   if (!err) console.log('Success!');
    // });
    // StudentsModel.findById('5acc6ef88c1993243c51198f', function (err, post) {
    //     if (!err) {
    //         console.log(post)
    //       post.userName.push(3);
    //       post.save(function (err) {
    //         console.log('ok')
    //       });
    //     }
    //   });
      


    const store = createStore(reducers);
    store.dispatch({
        type: LIST_ACTIONS.ITEM_ADD,
        item: {
            name: 'middleware',
            description: `Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way.
            It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.`,
        },
    });
    const context = {};
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter
                location={req.originalUrl}
                context={context}
            >
                <App />
            </StaticRouter>
        </Provider>
    );
    const finalState = store.getState();
    if (req.session.user) {

    }
    else {
        // if (req.originalUrl === '/') {
            // if (context.url) {console.log('hihihi')
            //     res.writeHead(301, {
            //         Location: context.url
            //     });
            //     res.end();
            // }
            // else {
                res.status(200).render('../views/index.ejs', {
                    html,
                    script: JSON.stringify(finalState)
                });
            // }
        // }
    }
    /*
        http://redux.js.org/docs/recipes/ServerRendering.html

        We can dispatch actions from server side as well. This can be very useful if you want
        to inject some initial data into the app. For example, if you have some articles that
        you have fetched from database and you want to load immediately after the user has loaded
        the webpage, you can do so in here.

        Here we are inject an list item into our app. Normally once the user has loaded the webpage
        we would make a request to the server and get the latest item list. But in the server we have
        instant connection to a database (for example, if you have a mongoDB or MySQL database installed
        in the server which contains all you items). So you can quickly fetch and inject it into the webpage.

        This will help SEO as well. If you load the webpage and make a request to the server to get all the
        latest items/articles, by the time Google Search Engine may not see all the updated items/articles.

        But if you inject the latest items/articles before it reaches the user, the Search Engine will see the
        item/article immediately.
    */
});

// router.get('*', (req, res) => {console.log('hahaha')
// 	if (req.params[0] === '/') {
//         if (!req.session.login) {
//             MongoClient.connect(urli, function(err, db) {
//                 if (err) return res.end('DB:ERROR');
//                 else {
//                     var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;
//                     db.collection('ban').find({'ip' : ip}).toArray(function (err, docs) {
//                         if (err) res.end('DB');
//                         else if (docs && docs.length && docs[0].num > 5) res.render(__dirname + '/app/view/guests/ban.jade');
//                         else res.render(__dirname + '/app/view/guests/index.jade');
//                         db.close();
//                     });
//                 }
//             });
//         }
//         else res.render(__dirname + '/app/view/users/chat.jade', {title: req.session.login});
//     }
//     else {
//         var pageName = req.params[0].substr(1),
//             str = pageName.charAt(0).toUpperCase() + pageName.substr(1),
//             page = __dirname + '/app/view/';
//         if (!req.session.login && fs.existsSync(page + 'guests/' + pageName + '.jade')) res.render(page + 'guests/' + pageName + '.jade', {title: str});
//         else if (req.session.login && fs.existsSync(page + 'users/' + pageName + '.jade')) res.render(page + 'users/' + pageName + '.jade', {title: str});
//         else res.render(__dirname + '/app/view/404.jade');
//     }
// });

export default router;
