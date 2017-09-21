'user strict'

var express = require('express');
var PhotoController = require('../controllers/photos');
var MiddlewareAuth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/photos'

});

var api = express.Router();
/*api.get('/photo/',PhotoController.prueba);*/
api.post('/photo/',MiddlewareAuth.ensureAuth, PhotoController.savePhoto);
api.post('/photo/uploadPhoto/:id',[MiddlewareAuth.ensureAuth,md_upload],PhotoController.uploadPhoto);
api.get('/photo/', MiddlewareAuth.ensureAuth, PhotoController.getPhotos);
api.get('/photo/getimage/:imageFile',PhotoController.getPhotoFile);
module.exports = api;