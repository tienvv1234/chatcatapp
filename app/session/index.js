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
    saveUninitialized: true,
    store: new RedisStore({
      host:
        'redis://h:p6c0e318479b97b7540b4b0194694ade7aaea47c083705dc32577b0a851c6e17f@ec2-35-173-225-39.compute-1.amazonaws.com',
      port: '25459',
      client: redis,
      ttl: 86400
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
