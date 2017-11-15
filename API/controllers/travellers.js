'use strict'

var User = require('../models/user');
var Status = require('../utils/http-status');

/**
 * Método que obtiene todos los usuarios de la aplicación
 * @param {*} req 
 * @param {*} res 
 */
function getAllUser(req, res) {

    User.find({}, function (err, users) {
        if (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).send({
                message: 'Error en la patición'
            });
        } else {
            res.status(Status.OK).send({
                travellers: users
            });
        }
    });
}

module.exports = {
    getAllUser
}