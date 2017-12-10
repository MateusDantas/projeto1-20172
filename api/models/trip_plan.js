'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripPlanSchema = new Schema({
    _route: {
        type: Schema.Types.ObjectId,
        ref: 'Route'
    },
    _bus: {
        type: Schema.Types.ObjectId,
        ref: 'Bus'
    },
    day: {
        type: Number,
        min: 0,
        max: 6
    },
    hour: Date,
    weekly: Boolean,
    holiday: Boolean,
    enabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('TripPlan', TripPlanSchema);
