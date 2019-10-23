let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

//Chai Setup
chai.use(chaiHttp);
chai.should();

describe('/GET winners', () =>{
    
    it("should get all winners", (done) => {

        chai.request(server)
        .get('/api/v1/winners')
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });
    
    it("should get one winner", (done) => {

        const id = 1;        
        chai.request(server)        
        .get(`/api/v1/winners/${id}`)
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });
    
    it("should not retrieve a winner as ID does not exist", (done) => {
        const id = 500;
        chai.request(server)
        .get(`/api/v1/winners/${id}`)
        .end((err,res) =>{
            res.should.have.status(404);
            done();            
        })
    });
    
    it("should not retrieve a winner as ID is a text", (done) => {
        const id = 'perro';
        chai.request(server)
        .get(`/api/v1/winners/${id}`)
        .end((err,res) =>{
            res.should.have.status(400);
            done();            
        })
    });     
          
})

describe('/POST winners', () =>{

    it("should post a winner", (done) =>{
        let winner = {
            year: 2012,
            winner: "San Francisco Giants",
            runnerup: "Detroit Tigers",
            result: "4-1",
            mvp: "Pablo Sandoval"
        }
        chai.request(server)
        .post('/api/v1/winners')
        .send(winner)
        .then(res => {
            res.should.have.status(201);
            done();
        })
        .catch(err => {
            res.should.have.status(err.status);
            done();
        })
    })

    it("should not post a winner without mvp field", (done) =>{
        let winner = {            
            year: 2013,
            winner: "Boston Red Sox",
            runnerup: "St. Louis Cardinals",
            result: "4-2"            
        }
        chai.request(server)
        .post('/api/v1/winners')
        .send(winner)
        .end((err,res) => {
            res.should.have.status(400);
            done();
        })
    })   
})

describe('/UPDATE winners', () =>{

    it("should update a winner", (done) =>{ 
        let winner = {
            year: 2013,
            winner: "San Francisco Giants",
            runnerup: "Detroit Tigers",
            result: "4-0",
            mvp: "Pablo Sandoval"
        }
        const id = 4;
        chai.request(server)
        .put(`/api/v1/winners/${id}`)
        .send(winner)
        .then(res => {
            res.should.have.status(204);
            done();
        })
        .catch(err => {
            res.should.have.status(err.status);
            done();
        })
               
    })

    it("should not update a winner as ID does not exist", (done) =>{
        let winner = {
            year: 2012,
            winner: "San Francisco Giants",
            runnerup: "Detroit Tigers",
            result: "4-0",
            mvp: "Pablo Sandoval"
        }
        const id = 500;
        chai.request(server)
        .put(`/api/v1/winners/${id}`)
        .send(winner)
        .end((err,res) => {
            res.should.have.status(404);
            done();
        })                
    })
    
    it("should not update a winner as ID is a text", (done) =>{
        let winner = {
            year: 2012,
            winner: "San Francisco Giants",
            runnerup: "Detroit Tigers",
            result: "4-0",
            mvp: "Pablo Sandoval"
        }
        const id = 'perro';
        chai.request(server)
        .put(`/api/v1/winners/${id}`)
        .send(winner)
        .end((err,res) => {
            res.should.have.status(400);
            done();
        })                
    })    
})

describe('/DELETE winners', () =>{

    it("should delete a winner", (done) =>{
        const id = 3;
        chai.request(server)
        .delete(`/api/v1/winners/${id}`)
        .end((err,res) => {
            res.should.have.status(204);
            done();
        })       
    })

    it("should not delete a winner as ID does not exist", (done) =>{
        const id = 500;
        chai.request(server)
        .delete(`/api/v1/winners/${id}`)
        .end((err,res) => {
            res.should.have.status(404);
            done();
        })               
    })
    
    it("should not delete a winner as ID is a text", (done) =>{
        const id = 'perro';
        chai.request(server)
        .delete(`/api/v1/winners/${id}`)
        .end((err,res) => {
            res.should.have.status(400);
            done();
        })               
    })    
})