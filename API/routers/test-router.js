'user strict'

var express = require('express');
var TestController = require('../controllers/test');
var MiddlewareAuth = require('../middlewares/authenticated');

var api = express.Router();
api.get('/test/:user', TestController.prueba);
module.exports = api;