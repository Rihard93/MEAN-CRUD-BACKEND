const mongoose = require('mongoose'); //Libreria para poder conectarse a la base de datos de mongoDB

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/crud-db', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(console.log('Connected to MongoDB'))
//.catch(error => handleError(error));


module.exports = mongoose; //Se exporta el metodo de conexion a la base de datos