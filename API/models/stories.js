'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Story',
    new Schema({
        author: {
            type: Schema.ObjectId,
            ref: 'Person'
        },
        title: String,
        fans: {
            type: Schema.ObjectId,
            ref: 'Person'
        },

    }));