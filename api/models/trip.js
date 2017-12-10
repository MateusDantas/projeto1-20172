'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TripSchema = new Schema({
    _trip_plan: {
        type: Schema.Types.ObjectId,
        ref: 'TripPlan'
    },
    date: Date
});


module.exports = mongoose.model('Trip', TripSchema);

