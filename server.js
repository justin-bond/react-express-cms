'use strict';

const dotenv    = require('dotenv');
dotenv.config();

const express   = require('express'),
  server        = express(),
  port          = process.env.SERVER_PORT || 3001,
  mongoose      = require('mongoose'),
  database      = require('./config/db'),
  Tasks         = require('./api/models/tasksModel'),
  User          = require('./api/models/userModel'),
  dev           = process.env.NODE_ENV !== 'production',
  jwtSignature  = process.env.JWT_SIGNATURE,
  bodyParser    = require('body-parser'),
  jsonwebtoken  = require("jsonwebtoken");


mongoose.Promise = global.Promise;
mongoose.connect(database.url, { useCreateIndex: true, useNewUrlParser: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], jwtSignature, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require('./api/routes');
routes(server);

server.listen(port);

console.log('CMS server started on: ' + port);

module.exports = server;