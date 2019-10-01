//Librerias, Controladores
const express = require("express"); //Libreria para poder hacer uso del framework express.js
var router = express.Router();
var { WS_Winner } = require("../models/ws-winners");
var ObjectId = require('mongoose').Types.ObjectId; //Variable para realizar la busqueda de datos por medio de ID's validos

//Se obtiene toda la informacion almacenada en la base de datos
router.get('/', (req, res) => {
    WS_Winner.find((err,docs) => {
        if (!err) { res.send(docs); }
        else { console.log("ERROR: Couldn't retrive data from database :" + JSON.stringify(err,undefined,2));  }
    });
});

//Se obtiene la informacion por medio del id
router.get('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))        
        return res.status(400).send(`No information found with the provided id : ${req.params.id}`);
    
    //Si el ID es correcto se realizar la busqueda por medio del ID enviado
    WS_Winner.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("ERROR: Couldn't retrive data from database :" + JSON.stringify(err,undefined,2));  }
    });
});

//Carga de datos a la base
router.post('/', (req,res) => {
    var win = new WS_Winner({
        year: req.body.year,
        winner: req.body.winner,
        runnerup: req.body.runnerup,
        result: req.body.result,
        mvp: req.body.mvp,
    });
    win.save((err,doc) =>{
        if (!err) { res.send(doc); }
        else { console.log("ERROR: Couldn't save data into database :" + JSON.stringify(err,undefined,2));  }
    });
});

//Update a la base de datos
router.put('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))        
        return res.status(400).send(`No information found with the provided id : ${req.params.id}`);

    var win = {
        year: req.body.year,
        winner: req.body.winner,
        runnerup: req.body.runnerup,
        result: req.body.result,
        mvp: req.body.mvp,
    };
    //Se hace activa la bandera de new para obtener la informacion actualizada
    WS_Winner.findByIdAndUpdate(req.params.id, { $set: win}, { new: true }, (err,doc) =>{
        if (!err) { res.send(doc); }
        else { console.log("ERROR: Couldn't update data in the database :" + JSON.stringify(err,undefined,2)); }
    });
});

//Eliminar registros de la base de datos
router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))        
        return res.status(400).send(`No information found with the provided id : ${req.params.id}`);
    
    WS_Winner.findByIdAndRemove(req.params.id, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log("ERROR: Couldn't delete data from database :" + JSON.stringify(err,undefined,2)); }
    });
});

module.exports = router;