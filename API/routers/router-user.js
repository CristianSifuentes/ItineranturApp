var express = require('express');
var UserController = require('../controllers/users');
var MiddlewareAuth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/users'

});

var api = express.Router();
api.get('/',UserController.prueba);
api.post('/user',UserController.saveUser);
api.post('/user/login',UserController.loginUser);
api.put('/user/:id',MiddlewareAuth.ensureAuth, UserController.updateUser);
api.post('/user/uploadimage/:id',[MiddlewareAuth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/user/getimage/:imageFile',UserController.getImageFile);
module.exports = api;