//Librerias, Controladores
const express = require("express"); //Libreria para poder hacer uso del framework express.js
var router = express.Router();
var { WS_Winner } = require("../models/ws-winners");
var ObjectId = require('mongoose').Types.ObjectId; //Variable para realizar la busqueda de datos por medio de ID's validos
var redis = require('redis');
const client = redis.createClient(6379, redis); //Se inicializa el cliente de redis

router.get('/', (req,res) =>{
    var redis_id = 1;
    client.get(redis_id, (err,docs)=>{
        if(err) { console.log('Error while retrieving the data from redis!: ' + err); }
        if(docs){
            console.log('Existe en redis!');
            res.status(200).send(JSON.parse(docs));
        }
        else{
            console.log('No existe en redis!');
            WS_Winner.find((err,docs) =>{ 
                if(!err){
                    client.setex(redis_id, 30, JSON.stringify(docs));
                    console.log('Response ingresado a redis!')
                    res.status(200).send(docs);                   
                }
                else{ console.log("ERROR: Couldn't retrive data from database :" + JSON.stringify(err,undefined,2)); }
            });
        }
    });
});

//Se obtiene la informacion por medio del id
router.get('/:id',(req,res) =>{
    client.get(req.params.id, (err, doc) =>{
        if(err) { console.log('Error while retrieving the data from Redis: ' + err);}
        if(doc){
            console.log('Existe en redis!');
            res.status(200).send(JSON.parse(doc));
        }
        else{
            console.log('No existe en redis!')
            WS_Winner.findById(req.params.id, (err,doc) =>{
                if(!err){ 
                    client.setex(req.params.id, 30, JSON.stringify(doc));
                    console.log('Response ingresado a redis!')
                    res.status(200).send(doc);
                 }
                 else { res.status(404).send(`No information found with the provided id : ${req.params.id}`); }
            });
        }
    });
});

//Nuevo registro
router.post('/', (req,res) => {
    var win = new WS_Winner({
        year: req.body.year,
        winner: req.body.winner,
        runnerup: req.body.runnerup,
        result: req.body.result,
        mvp: req.body.mvp,
    });
    win.save((err,doc) =>{
        res.status(201).send(doc);
        /*if (!err) { res.status(201).send(doc); }
        else { console.log("ERROR: Couldn't save data into database :" + JSON.stringify(err,undefined,2)); }*/
    });
});

//Update a un registro
router.put('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))        
        return res.status(404).send(`No information found with the provided id : ${req.params.id}`);

    var win = {
        year: req.body.year,
        winner: req.body.winner,
        runnerup: req.body.runnerup,
        result: req.body.result,
        mvp: req.body.mvp,
    };
    //Se hace activa la bandera de new para obtener la informacion actualizada
    WS_Winner.findByIdAndUpdate(req.params.id, { $set: win}, { new: true }, (err,doc) =>{
        res.status(204).send(doc);
        /*if (!err) { res.status(204).send(doc); }
        else { console.log("ERROR: Couldn't update data in the database :" + JSON.stringify(err,undefined,2)); }*/
    });
});

//Eliminar registros
router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))        
        return res.status(404).send(`No information found with the provided id : ${req.params.id}`);
    
    WS_Winner.findByIdAndRemove(req.params.id, (err,doc) => {
        res.status(204).send(doc);
        /*if (!err) { res.status(204).send(doc); }
        else { console.log("ERROR: Couldn't delete data from database :" + JSON.stringify(err,undefined,2)); }*/
    });
});

module.exports = router;