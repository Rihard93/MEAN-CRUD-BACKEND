const mongoose = require('mongoose'); //Libreria para poder conectarse a la base de datos de mongoDB

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/crud-db', {useNewUrlParser: true});
var db =  mongoose.connection; //Resultado de la conexion a la base de datos
db.on('error',console.error.bind(console, 'Connection error:'));
db.on('open', function(){
    console.log('Connected to MongoDB');
});

module.exports = mongoose; //Se exporta el metodo de conexion a la base de datos