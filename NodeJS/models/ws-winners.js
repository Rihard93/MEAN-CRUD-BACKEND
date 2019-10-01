//Librerias, Controladores, Variables
const mongoose = require("mongoose"); //Libreria para poder conectarse a la base de datos de mongoDB

//Estructura de datos del modelo
var WS_Winner = mongoose.model("ws-winner", {
  year: { type: Number },
  winner: { type: String },
  runnerup: { type: String },
  result: { type: String },
  mvp: { type: String }
});

module.exports = { WS_Winner };