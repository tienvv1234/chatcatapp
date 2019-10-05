// 'use strict';

// const cluster = require('cluster');
// const os = require('os');
// console.log('cluster.isMaster', cluster.isMaster);
// if (cluster.isMaster) {
//   for (let index = 0; index < os.cpus().length; index++) {
//     console.log('cluster ' + index);
//     cluster.fork();
//   }
// } else {
//   console.log(2);
//   const express = require('express');
//   const app = express();
//   const chatCat = require('./app');
//   const passport = require('passport');
//   app.set('port', process.env.PORT || 3000);
//   app.use(express.static('public'));
//   app.set('view engine', 'ejs');

//   app.use(chatCat.session);
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(
//     require('morgan')('combined', {
//       stream: {
//         write: message => {
//           // write to log
//           chatCat.logger.log('info', message);
//         }
//       }
//     })
//   );
//   app.use('/', chatCat.router);

//   chatCat.ioServer(app).listen(app.get('port'), () => {
//     console.log('chatCAT Running on Port:', app.get('port'));
//   });
// }
const express = require('express');
  const app = express();
  const chatCat = require('./app');
  const passport = require('passport');
  app.set('port', process.env.PORT || 3000);
  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  app.use(chatCat.session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    require('morgan')('combined', {
      stream: {
        write: message => {
          // write to log
          chatCat.logger.log('info', message);
        }
      }
    })
  );
  app.use('/', chatCat.router);

  chatCat.ioServer(app).listen(app.get('port'), () => {
    console.log('chatCAT Running on Port:', app.get('port'));
  });