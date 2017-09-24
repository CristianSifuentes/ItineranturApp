'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Contact',
    new Schema({
        user: { type: Schema.ObjectId, ref: 'User' },
        user_contact: { type: Schema.ObjectId, ref: 'User' },
        status: String

    }));