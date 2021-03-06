/* importaciones de dependecias para su uso */

'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var user_routes = require('./routers/router-user');
var photos_routes = require('./routers/router-photo');
var contact_routes = require('./routers/router-contact');
var traveller_router = require('./routers/router-travellers');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method ');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', user_routes);
app.use('/api', photos_routes);
app.use('/api', contact_routes);
app.use('/api', traveller_router);
module.exports = app;