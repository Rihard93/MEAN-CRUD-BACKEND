//Funcion para validar que el ID enviado sea un numero ---> METODO EXCLUSIVO PARA ESTA ENTREGA
function check_id(req, res, next){
    const id = req.params.id;

    if(!Number.isInteger(parseInt(id))){
        res.status(400).json({
             message: 'ID must be a number!'
         })
    }
    else{
        next()
    }
}

//Funcion para validar los campos que se envien a la API
function rev(req,res,next){
    const { year, winner, runnerup, result, mvp} = req.body

    if(year && winner && runnerup && result && mvp){
        next()
    }
    else{
        res.status(400).json({
              message: 'Empty field detected, please check your request!'
        })
    }
}

module.exports = {
    check_id,
    rev
}