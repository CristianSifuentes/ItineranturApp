/* importaciones de dependecias para su uso */
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var user_routes = require('./routers/router-user');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', user_routes);
module.exports = app;