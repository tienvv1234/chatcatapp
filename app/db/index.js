'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const logger = require('../logger');
mongoose.Promise = global.Promise;
mongoose.connect(config.dbURI, { useNewUrlParser: true });
// const Mongoose = require('mongoose').connect(config.dbURI, {
//   useNewUrlParser: true
// });

// Log an error if the connection fails
mongoose.connection.on('error', error => {
  logger.log('error', 'Mongoose connection error: ' + error);
});

// Create a Schema that defines the structure for storing user data
const chatUser = new mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

// Turn the schema into a usable model
let userModel = mongoose.model('chatUser', chatUser);

module.exports = {
  mongoose,
  userModel
};
