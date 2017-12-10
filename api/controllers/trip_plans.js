'use strict';

var passport = require('passport');
var mongoose = require('mongoose');

require('../models/trip_plan');
var TripPlan = mongoose.model('TripPlan');

exports.create_trip_plan = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      if (user) {
        TripPlan.create(
            {
                _route: req.body.route, 
                _bus: req.body.bus, 
                day: req.body.day,
                hour: req.body.hour,
                weekly: req.body.weekly,
                holiday: req.body.holiday,
                enabled: req.body.enabled
            }, function (err, trip_plan) {
          if (err) {
            return res.status(400).send({ error: err })
          }
          res.status(200).send(trip_plan);
        });
      }
    })(req, res, next);
}

simple_search = function (req, res, next, query) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
      TripPlan.find(query, function(err, trip_plans) {
        if (err)
          res.send(err);
        res.json(trip_plans);
      });
    }
  })(req, res, next);
}
// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id),mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...] 
exports.find_by_route = function(req, res, next, route_ids){
  var query = {route: { $in: route_ids}};
  simple_search(req, res, next, query);
}

// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id),mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...] 
exports.find_by_bus = function(req, res, next, bus_ids){
  var query = {bus: { $in: bus_ids}};
  simple_search(req, res, next, query);
}

exports.find_by_day = function(req, res, next, day_n){
  var query = {day: day_n};
  simple_search(req, res, next, query);
}

exports.find_all_weekly = function(req, res, next){
  var query = {weekly: true};
  simple_search(req, res, next, query);
}

exports.find_all_holidays = function(req, res, next){
  var query = {holiday: true};
  simple_search(req, res, next, query);
}

exports.find_all_days = function(req, res, next){
  var query = {weekly: true, holiday: true};
  simple_search(req, res, next, query);
}

// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id), mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...] 
exports.find_by_route_all_days = function(req, res, next, route_ids){
  var query = {route: { $in: route_ids}, weekly: true, holiday: true};
  simple_search(req, res, next, query);
}

// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id), mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...]
exports.find_by_route_all_weekly = function(req, res, next, route_ids){
  var query = {route: { $in: route_ids}, weekly: true};
  simple_search(req, res, next, query);
}

// O formato do objeto ids deve ser [mongoose.Types.ObjectId(id), mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)...]
exports.find_by_route_all_holiday = function(req, res, next, route_ids){
  var query = {route: { $in: route_ids}, holiday: true};
  simple_search(req, res, next, query);
}

exports.list_all_trip_plans = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
      TripPlan.find({}, function(err, trip_plans) {
        if (err)
          res.send(err);
        res.json(trip_plans);
      });
    }
  })(req, res, next);
}