### koa-passport-jwt

[![Greenkeeper badge](https://badges.greenkeeper.io/f0rr0/koa-passport-jwt.svg)](https://greenkeeper.io/)

Koa authentication using [JSON Web Tokens](https://jwt.io) and [Passport](http://passportjs.org)
* [Node 6+](https://nodejs.org/en/) (Supports 96% of ES6)
* [Koa 2](https://github.com/koajs/koa/tree/v2.x) (async/await transpiled with Babel)
* [Webpack 2](https://webpack.github.io/) (ES6 modules and HMR)
* Hot Module Replacement for seamless workflow.

---

### How to use

Note: You'll probably need to run 3 different shell tabs/windows.

Install redis and start a redis server. 
```
brew install redis
redis-server
```
Clone the repo, install dependencies and build in watch mode.
```
git clone https://github.com/sidjain26/koa-passport-jwt
npm i
npm run watch
```
Start the server.
```
npm start
```

### License

MIT
