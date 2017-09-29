'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Person',
    new Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        age: Number,
        user: {
            type: Schema.ObjectId,
            ref: 'Story'
        }

    }));