'use strict'

var Photo = require('../models/photos');
var Status = require('../utils/http-status');
var fs = require('fs');
var path = require('path');

function prueba(req, res) {
    res.status(Status.OK).send({
        message: 'Probando una acción del controlador del api de res de usuarios'

    });
}
/**
 * Método que realiza la creación de una nueva photo
 * @param {*} req 
 * @param {*} res 
 */
function savePhoto(req, res) {
    var photo = new Photo();
    let params = req.body;
    photo.name = params.name;
    photo.description = params.description;
    photo.user = params.user;
    photo.image = null;
    console.log(params);

    photo.save((err, photoStored) => {
        if (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).send({
                message: 'Error en el servidor'
            });
        } else {
            if (!photoStored) {
                res.status(Status.NOT_FOUND).send({
                    message: 'Nom se ha guardado en photo'
                });
            } else {
                res.status(Status.OK).send(photoStored);
            }
        }

    });

}

/**
 * Método que sube una imagen a una photo insertada
 * @param {*} req 
 * @param {*} res 
 */
function uploadPhoto(req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(ext_split);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Photo.findByIdAndUpdate(userId, {
                image: file_name
            }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(Status.NOT_FOUND).send({
                        menssage: 'No se ha podido actualizar la fotografìa'
                    });
                } else {
                    res.status(Status.OK).send({
                        image: file_name,
                        user: userUpdated
                    });
                }
            });
        } else {
            res.status(Status.OK).send({
                message: 'Extensión de archivo no válida'
            });
        }

    } else {
        res.status(Status.INTERNAL_SERVER_ERROR).send({
            message: 'No ha subido ninguna imagen'
        });
    }
}

/**
 * Mètodo que obtiene las fotos de los contactos de un usuario
 * @param {*} req 
 * @param {*} res 
 */
function getPhotos(req, res) {

    var userId = req.params.user;

    if (!userId) {
        var find = Photo.find({}).sort('name');
    } else {
        //sacar los albums de un artista concreto de la bbdd
        var find = Photo.find({
            user: userId
        }).sort('name');
    }

    find.populate({
        path: 'user'
    }).exec((err, albums) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la patición'
            });
        } else {
            res.status(200).send(albums);
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getPhotoFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/photos/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(Status.OK).send({
                message: 'No existe la imagen'
            });
        }
    });

}





/**
 * Mètodo que obtiene las fotos de los contactos de un usuario
 * @param {*} req 
 * @param {*} res 
 */
function getPhotosTest(req, res) {
    
        var userId = req.params.user;
    
        if (!userId) {
            var find = Photo.find({}).sort('name');
        } else {
            //sacar los albums de un artista concreto de la bbdd
            var find = Photo.find({
                user: userId
            }).sort('name');
        }
    
        find.populate({
            path: 'user'
        }).exec((err, albums) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en la patición'
                });
            } else {
                res.status(200).send(albums);
            }
        });
    }


module.exports = {
    prueba,
    savePhoto,
    uploadPhoto,
    getPhotos,
    getPhotoFile,
    getPhotosTest
}