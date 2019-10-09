let winners = require('../data/winners.json');
const fs = require('fs');
const file = './data/winners.json';
var id; 

function getWinners(){
    return new  Promise((resolve, reject) =>{
        if(winners.length === 0){
            reject({
                message: 'No winners available',
                status: 202
            })
        }
        resolve(winners)
    })
}

function getWinner(id){
    return new Promise((resolve,reject) =>{
        const row = winners.find(r => r.id == id)
        if(!row){
            reject({
                message: 'ID is not valid!',
                status: 404
            })
        }
        resolve(row)
    })
}

function insertWinner(newWinner){    
    return new Promise((resolve,reject) =>{
        if(winners.length > 0){
            id = winners[winners.length -1].id + 1;
        }
        else{
            id = 1;
        }
        newWinner = {id, ...newWinner}
        winners.push(newWinner)
        fs.writeFileSync(file, JSON.stringify(winners), 'utf8', (err) => {
            if(err){
                console.log(err);
            }
        })
        resolve(newWinner)
    })
}

function updateWinner(id, newWinner){
    return new Promise((resolve,reject)=>{
        const row = winners.find(r => r.id == id)
        if(!row){
            reject({
                message: 'ID is not valid!',
                status: 404
            })
        }        
        const index = winners.findIndex(w => w.id == row.id)
        id = {id: row.id}
        winners[index] = {...id, ...newWinner}        
        fs.writeFileSync(file, JSON.stringify(winners), 'utf8', (err) => {
            if(err){
                console.log(err);
            }
        })        
        resolve(winners[index])
        .catch(err => reject(err))
    })
}

function deleteWinner(id){
    return new Promise((resolve,reject) => {
        const row = winners.find(r => r.id == id)
        if(!row){
            reject({
                message: 'ID is not valid!',
                status: 404
            })
        } 
        winners = winners.filter(w => w.id !== row.id)        
        fs.writeFileSync(file, JSON.stringify(winners), 'utf8', (err) => {
            if(err){
                console.log(err);
            }
        })
        resolve()
        .catch(err => reject(err))      
    })
}

module.exports = {
    getWinners,
    getWinner,
    insertWinner,
    updateWinner,
    deleteWinner
}