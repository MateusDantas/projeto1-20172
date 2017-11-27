'use strict';
var passport = require('passport');
var mongoose = require('mongoose');

require('../models/route');

var Route = mongoose.model('Route');

exports.create_route = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      if (user) {
        Route.create({ origin: req.body.from, destination: req.body.to, duration: req.body.duration }, function (err, route) {
          if (err) {
            return res.status(400).send({ error: err })
          }
          res.status(200).send(route);
        });
      }
    })(req, res, next);
}

exports.list_all_routes = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      if (user) {
        Route.find({}, function(err, route) {
          if (err)
            res.send(err);
          res.json(route);
        });
      }
    })(req, res, next);
}