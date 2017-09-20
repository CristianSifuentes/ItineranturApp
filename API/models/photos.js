'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Photo',
    new Schema({
        name: String,
        description: String,
        user: { type: Schema.ObjectId, ref: 'User' },
        image: String

    }));