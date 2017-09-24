'user strict'

var express = require('express');
var ContactController = require('../controllers/contacts');
var MiddlewareAuth = require('../middlewares/authenticated');


var api = express.Router();
api.get('/contact', ContactController.prueba);
api.post('/contact/', MiddlewareAuth.ensureAuth, ContactController.saveContact);
api.get('/contacts/:user', MiddlewareAuth.ensureAuth, ContactController.getContactsByUsuer);
module.exports = api;