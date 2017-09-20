'user strict'

var express = require('express');
var PhotoController = require('../controllers/photos');
var MiddlewareAuth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/photos'

});

var api = express.Router();
api.get('/photo/',PhotoController.prueba);
api.post('/photo/',MiddlewareAuth.ensureAuth, PhotoController.savePhoto);
api.post('/photo/uploadPhoto/:id',[MiddlewareAuth.ensureAuth,md_upload],PhotoController.uploadPhoto);
/*api.post('/user/login',UserController.loginUser);
api.put('/user/:id',MiddlewareAuth.ensureAuth, UserController.updateUser);
api.post('/user/uploadimage/:id',[MiddlewareAuth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/user/getimage/:imageFile',UserController.getImageFile);*/
module.exports = api;