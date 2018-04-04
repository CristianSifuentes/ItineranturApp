var mongoose = require('mongoose');
var app = require('./app');
var port = process.env._port || 3977;

mongoose.connect('mongodb://localhost:27017/DbItinerantur', (err, res) => {
    if (err) {
        throw err;
    } else {
       console.log('la conexión a la base de datos está corriendo corractamente..');
      app.listen(port, function(){
            console.log('El servidor esta recibiendo peticiones');
      });
    }
});
