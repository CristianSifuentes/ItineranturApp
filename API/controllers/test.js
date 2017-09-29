'use strict'

/*var Person = require('../models/persons');
/*var Story = require('../models/stories');
*/
var Status = require('../utils/http-status');
var Contact = require('../models/contacts');
var Photo = require('../models/photos');
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'Story'
    }]
});

var storySchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    title: String,
    fans: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);



function prueba(req, res) {

    User.aggregate([{
        $lookup: {
            from: "photo",
            localField: "_id",
            foreignField: "user",
            as: "example"
        }
    }]).exec(function (err, response) {
        if (err) {
            res.status(500).send({
                message: 'Error en la patición'
            });
        } else {
            res.status(200).send(response);
        }
    });
    console.log(Contact);
    /*let userId = req.params.user;
    let find;
    if (!userId) {
        find = Contact.find({
            status: 'Activo'
        });
    } else {
        find = Contact.find({
            user: userId,
            status: 'Activo'
        });
    }
    console.log("find : " + find);
    find.find({}, function (err, contacts) {
        if (err) {
            res.status(500).send({
                message: 'Error en la patición'
            });
        } else {
            res.status(200).send(contacts);
        }

    });
*/






    /*var userId = req.params.user;
        
            if (!userId) {
                var find = Photo.find({}).sort('name');
            } else {
            
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
            });*/














    /*var author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
    });

    author.save(function (err) {
        if (err) return handleError(err);

        var story1 = new Story({
            title: 'Casino Royale',
            author: author._id // assign the _id from the person
        });

        story1.save(function (err) {
            if (err) return handleError(err);
            // thats it!
        });
    });*/

    /* populate example */
    /*Story.
    findOne({
        title: 'Casino Royale'
    }).
    populate('author').
    exec(function (err, story) {
        if (err) {
            res.status(500).send({
                message: 'Error en la patición'
            });
        } else {
            res.status(200).send(story);
        }
    });*/


    /*Story.
    findOne({
        title: /casino royale/i
    }).
    populate('author', 'name'). // only return the Persons name
    exec(function (err, story) {
        if (err) {
            res.status(500).send({
                message: 'Error en la patición'
            });
        } else {
            res.status(200).send(story.author);
        }
    });*/


}

module.exports = {
    prueba
}