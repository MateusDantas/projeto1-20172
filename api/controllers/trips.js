'use strict';

var passport = require('passport');
var mongoose = require('mongoose');

require('../models/trip');
var Trip = mongoose.model('Trip');

exports.create_trip = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      if (user) {
        Trip.create(
            {
                _trip_plan: req.body.trip_plan, 
                date: req.body.date
            }, function (err, trip) {
          if (err) {
            return res.status(400).send({ error: err })
          }
          res.status(200).send(trip);
        });
      }
    })(req, res, next);
}

simple_search = function(req, res, next, query){
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
      Trip.find(query, function(err, trips) {
        if (err)
          res.send(err);
        res.json(trips);
      });
    }
  })(req, res, next);
}
}

//busca uma viagem pelos ids dos trip plans
// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id), mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...] 
exports.search_by_plan = function(req, res, next, plan_ids){
  var query = {trip_plan: { $in: plan_ids}};
  simple_search(req, res, next, query);
}
//busca uma viagem pela data
exports.search_by_date = function(req, res, next, trip_date){
  var query = {date: trip_date};
  simple_search(req, res, next, query);
}
//busca uma viagem pelo ids dos trip plans e a data
// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id), mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...]   
exports.search_by_date_plan = function(req, res, next, trip_date, plan_ids){
  var query = {date: trip_date, trip_plan: { $in: plan_ids}};
  simple_search(req, res, next, query);
}

exports.list_all_trips = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
      Trip.find({}, function(err, trips) {
        if (err)
          res.send(err);
        res.json(trips);
      });
    }
  })(req, res, next);
}

