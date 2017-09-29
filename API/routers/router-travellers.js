'user strict'

var express = require('express');
var TravellersController = require('../controllers/travellers');
var MiddlewareAuth = require('../middlewares/authenticated');


var api = express.Router();
api.get('/travellers', MiddlewareAuth.ensureAuth, TravellersController.getAllUser)
module.exports = api;