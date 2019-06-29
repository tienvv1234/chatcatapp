'use strict';
// Basically, express-session is more abstract, it supports different session stores (like files, DB, cache and whatnot).
// And cookie-session is a simple / lightweight cookie-based
// (cookie is the only storage engine supported: all the session info is stored on the client, in a cookie)
// session implementation. This kind of sessions is probably most famous for its Rails implementation.
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');
const redis = require('redis').createClient();
const RedisStore = require('connect-redis')(session);

if (process.env.NODE_ENV === 'production') {
  // Initialize session with settings for production
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      host: config.redis.host,
      port: config.redis.port,
      client: redis,
      ttl: 260
    })
    // store: new MongoStore({
    //   mongooseConnection: db.mongoose.connection
    // })
  });
} else {
  // Initialize session with settings for dev
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000
    },
    // store: new RedisStore({
    //   host: config.redis.host,
    //   port: config.redis.port,
    //   client: redis,
    //   ttl: 600
    // })
    store: new MongoStore({
      mongooseConnection: db.mongoose.connection
    })
  });
}
