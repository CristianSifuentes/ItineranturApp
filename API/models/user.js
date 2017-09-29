'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User',
    new Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        lastname: String,
        nickname: String,
        age: Number,
        gender: String,
        email: String,
        password: String,
        image: String,
        role: String

    }));