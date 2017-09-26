'use strict'

var Contact = require('../models/contacts');
var Photo = require('../models/photos');
var Status = require('../utils/http-status');

function prueba(req, res) {
    res.status(Status.OK).send({
        message: 'Probando una acción del controlador del api de res de contactos'

    });
}

/**
 * Mètodo que inserta un contacto a un usuario nuevo
 * @param {*} req 
 * @param {*} res 
 */
function saveContact(req, res) {

    var contact = new Contact();
    let params = req.body;
    contact.user = params.user;
    contact.user_contact = params.user_contact;
    contact.status = params.status;


    contact.save((err, contactStored) => {
        if (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).send({ message: 'Error en el servidor' });
        } else {
            if (!contactStored) {
                res.status(Status.NOT_FOUND).send({ message: 'Nom se ha guardado en photo' });
            } else {
                res.status(Status.OK).send({ photo: contactStored });
            }
        }

    });

}

/**
 * Método que consulta los contactos de un usuario
 * @param {*} req 
 * @param {*} res 
 */
function getContactsByUsuer(req, res) {

    let userId = req.params.user;
    let find;
    if (!userId) {
        find = Contact.find({ status: 'Activo' });
    } else {
        find = Contact.find({ user: userId, status: 'Activo' });
    }

    find.find({}, function (err, contacts) {
        if (err) {
            res.status(500).send({ message: 'Error en la patición' });
        } else {
            res.status(200).send(contacts);
        }

    });

}



module.exports = {
    prueba,
    saveContact,
    getContactsByUsuer
}