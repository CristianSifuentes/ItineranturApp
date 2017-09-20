'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', 
new Schema({ 
    name: String,
    lastname: String,
    nickname: String,
    age: Number,
    gender : String,
    email: String, 
    password: String, 
    image: String,
    role: String

}));