'user strict'

var User = require('../models/user');
var Status = require('../utils/http-status')
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoose = require('mongoose');

function prueba(req, res) {
  res.status(Status.OK).send({
    message: 'Probando una acción del controlador del api de res de usuarios'

  });
}

/**
 * Método que realiza el insert de un nuevo usuario a la aplicación
 * @param {*} req 
 * @param {*} res 
 */
function saveUser(req, res) {
  var user = new User();
  var params = req.body;
  
  user._id = new mongoose.Types.ObjectId;
  user.name = params.name;
  user.lastname = params.lastname;
  user.nickname = params.nickname;
  user.age = params.age;
  user.gender = params.gender;
  user.email = params.email;
  user.image = params.image;
  user.role = params.role;

  if (params.password) {
    bcrypt.hash(params.password, null, null, function (err, hash) {
      user.password = hash;
      if (user.name != null && user.nickname != null && user.email != null) {
        //Guardar el usuario
        user.save((err, userStored) => {
          if (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).send(
              { menssage: 'Error al guardar el usuario' }
            );
          } else {
            if (!userStored) {
              res.status(Status.NOT_FOUND).send(
                { message: 'No se ha registrado usuario' }
              );
            } else {
              res.status(Status.CREATED).send(
                { message: userStored }
              );
            }
          }

        });
      } else {
        res.status(Status.ACCEPTED).send({
          message: 'Rellena todos los campos'

        });
      }


    });
  } else {
    res.status(Status.ACCEPTED).send(
      {
        menssage: 'Introduce la contraseña'
      }

    );
  }
}

/**
 * Método que realiza el login de un usuario en la aplicación
 * @param {*} req 
 * @param {*} res 
 */
function loginUser(req, res) {
  var params = req.body;

  var email = params.email;
  var password = params.password;
  User.findOne({
    email: email.toLowerCase()
  }, (err, user) => {
    if (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).send({ menssage: 'Error en el servidor, favor de procesar nuevamente.' });
    } else {
      if (!user) {
        res.status(Status.NOT_FOUND).send({ menssage: 'El usuario no existe' });
      } else {
        //Compara las contraseñas
        bcrypt.compare(password, user.password, function (err, check) {
          if (check) {
            //devolver  los datos del usuario logeado
            if (params.gethash) {
              //devolver un token de jwt
              res.status(Status.OK).send({
                token: jwt.createToken(user)
              });
            } else {
              res.status(Status.OK).send(user);
            }
          } else {
            res.status(static.NOT_FOUND).send({ menssage: 'El usuario no ha posido logearse', params: params });
          }
        });
      }
    }


  });
}


/**
 * Método que realiza la actualización de los datos de un usuario
 * @param {*} req 
 * @param {*} res 
 */
function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).send({ menssage: 'Error al actualizar el usuario' });
    } else {
      if (!userUpdated) {
        res.status(Status.NOT_FOUND).send({ menssage: 'No se ha podido actualizar el usuario' });
      } else {
        res.status(Status.OK).send({ user: userUpdated });
      }
    }


  });

}


/**
 * Método que realiza la carga al servidor de una imagen para el usuario
 * @param {*} req 
 * @param {*} res 
 */
function uploadImage(req, res) {
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
      User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
        if (!userUpdated) {
          res.status(Status.NOT_FOUND).send({ menssage: 'No se ha podido actualizar el usuario' });
        } else {
          res.status(Status.OK).send({ image: file_name, user: userUpdated });
        }
      });
    } else {
      res.status(Status.OK).send({ message: 'Extensión de archivo no válida' });
    }

  } else {
    res.status(Status.INTERNAL_SERVER_ERROR).send({ message: 'No ha subido ninguna imagen' });
  }
}


/**
 * Método que realiza la obtención de la imagen de un usuario
 * @param {*} req 
 * @param {*} res 
 */
function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/' + imageFile;
  fs.exists(path_file, function (exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(Status.OK).send({ message: 'No existe la imagen' });
    }
  });

}

/**
 * Método que 
 * @param {*} req 
 * @param {*} res 
 */
function getImageFileByUser(req, res) {
  var userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).send({ message: 'Error en la petición' });
    } else {
      if (!user) {
        res.status(Status.NOT_FOUND).send({ message: 'El Album no existe' });
      } else {
        var path_file = './uploads/users/' + user.image;
        fs.exists(path_file, function (exists) {
          if (exists) {
            res.sendFile(path.resolve(path_file));
          } else {
            res.status(Status.OK).send({ message: 'No existe la imagen' });
          }
        });
      }
    }
  });

}



module.exports = {
  prueba,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile,
  getImageFileByUser
}