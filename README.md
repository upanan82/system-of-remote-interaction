# System of Remote Interaction

This is a system of remote interaction for teachers and students.

Here is the description of the project, its installation, build and deploy.


## Frameworks and Libraries

List of used libraries and frameworks in the project. See the `package.json` file for all versions.

- [ReactJS] - A JavaScript library for building user interfaces
- [React Router v4] - Declarative Routing for React.js
- [Redux] - Redux is a predictable state container for JavaScript apps
- [Babel] - The compiler to compile JS files with es6, es7, JSX syntax to regular javascript
- [Webpack] - The module binder which takes all JS files from different directories and compiles them into a single app.bundle.js (you can change the filename of course)
- [ExpressJS] - Fast, unopinionated, minimalist web framework for Node.js
- [TypeScript] - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript
- [jQuery] - jQuery is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML


## Installation

Node Version: `v8.9.4`

Just clone this repo or download the zip file. `cd` into the directory and run:

    npm install

This command will add to the project a `node_modules` folder with modules and a `package-lock.json` file. After this the installation will be completed.


## Developing App with Hot Reload

To develop your own react application, you can take advantage of React Hot Loader and Webpack Dev Server. To develop app with hot reload:

    npm run dev

Now you can access application on http://localhost:8080


## Production build and Deploy

To make a production build of project, run the following commands:

    npm run build
  
This will create two files: `index.js` in `server/public/js` and `server.js` in `server/bin`.

`server.js` will be used for serving the application on port 3000 and `index.js` is the actual react app itself.

Finally run:

    npm start

The you will be able to access this app from http://localhost:3000.

To get a distributable tarball of your application, run this command:

    npm pack

Remember that you have to run `npm run build` before doing this. This will create a tar.gz file in your root folder. The contents in this file is deployable. All you need to do is copy the contents inside package folder inside this tar.gz file to your server and run the app with something like [pm2].


## About




## Author

**Dmytro Onyshchenko**

[ReactJS]: <https://facebook.github.io/react/>
[Babel]: <https://babeljs.io/>
[Webpack]: <https://webpack.github.io/>
[React Router v4]: <https://reacttraining.com/react-router/>
[ExpressJS]: <http://expressjs.com/>
[Redux]: <http://redux.js.org/>
[pm2]: <https://github.com/Unitech/pm2>
[upanan82]: <https://github.com/upanan82>
[TypeScript]: <https://www.typescriptlang.org/>
[jQuery]: <https://jquery.com/>