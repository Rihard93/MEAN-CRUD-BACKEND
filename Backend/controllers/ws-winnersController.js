//Librerias, Controladores
const express = require("express"); //Libreria para poder hacer uso del framework express.js
var router = express.Router();
var WS_Winner  = require("../models/ws-winners");
const checker = require("../controllers/validator")

//Se obtiene toda la informacion almacenada en la base de datos
router.get('/', async (req,res) =>{
    await WS_Winner.getWinners()
    .then(winners => res.status(200).json(winners))
    /*.catch(err => {
        if (err.status){
            res.status(err.status).json({ message: err.message })
        }
    })*/
})

//Se obtiene la informacion por medio del id
router.get('/:id', checker.check_id, async (req, res) =>{
    const id = req.params.id
     await WS_Winner.getWinner(id)
    .then(winner => res.status(200).json(winner))
    .catch(err => {
        if(err.status){
            res.status(err.status).json({ message: err.message })
        }
    })

})

//Nuevo registro
router.post('/', checker.rev, async (req,res) =>{
     await WS_Winner.insertWinner(req.body)
    .then(winner => res.status(201).json({
        message: 'Winner added!',
        content: winner
    }))
    //.catch(err => res.status(err.status).json({ message: err.message }))
})

//Actualizar registro
router.put('/:id', checker.check_id, checker.rev, async (req,res) =>{
    const id = req.params.id
    await WS_Winner.updateWinner(id, req.body)
    .then(res.status(204))
    /*.then(winner => res.json({
        message: 'Winner updated!',
        content: winner
    }))*/
    .catch(err => {
        if(err.status){
            res.status(err.status).json({ message: err.message })
        }
    })
})

//Eliminar registro
router.delete('/:id', checker.check_id, (req,res) =>{
    const id = req.params.id
    WS_Winner.deleteWinner(id)
    .then(res.status(204))
    /*.then(res.json({
        message: 'Winner deleted!'             
    }))*/
    .catch(err => {
        if(err.status){
            res.status(err.status).json({ message: err.message })
        }
    })
})

module.exports = router