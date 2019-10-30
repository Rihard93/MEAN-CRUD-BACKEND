let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var global_id;

//Chai Setup
chai.use(chaiHttp);
chai.should();

describe('/GET winners', () =>{

    it("should get all winners", (done) => {

        chai.request(server)
        .get('/winners')
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');            
            done();            
        })
    });
    
    it("should get one winner", (done) => {

        const id = '5d85766bd91e8d2d5c358fc9';     
        chai.request(server)        
        .get(`/winners/${id}`)
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });
    
    it("should not retrieve a winner as ID does not exist", (done) => {

        const id = 1;        
        chai.request(server)        
        .get(`/winners/${id}`)
        .end((err,res) =>{
            res.should.have.status(404);
            done();                        
        })
    });    
    
})

describe('/POST winners', () =>{

    it("should post a winner", (done) => {

        let winner = {
            year: 2019,
            winner: "Boston Red Sox",
            runnerup: "Los Angeles Dodgers",
            result: "4-1",
            mvp: "Steve Pearce"
        }

        chai.request(server)
        .post('/winners')
        .send(winner)
        .end((err,res) =>{
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('year');
            res.body.should.have.property('winner');
            res.body.should.have.property('runnerup');
            res.body.should.have.property('result');
            res.body.should.have.property('mvp');
            global_id = res.body._id;
            //console.log(global_id);          
            done();
            
        })
    });
});

describe('/PUT winners', () =>{

    it("should update a winner", (done) => {

        let winner = {
            year: 2018,
            winner: "Boston Red Sox",
            runnerup: "Los Angeles Dodgers",
            result: "4-1",
            mvp: "Steve Pearce"
        }

        chai.request(server)
        .put(`/winners/${global_id}`)
        .send(winner)
        .end((err,res) =>{
            res.should.have.status(204);                    
            done();
            
        })
    });

    it("should not update a winner as ID does not exist", (done) => {

        let winner = {
            year: 2018,
            winner: "Boston Red Sox",
            runnerup: "Los Angeles Dodgers",
            result: "4-1",
            mvp: "Steve Pearce"
        }

        const id = 1;
        chai.request(server)
        .put(`/winners/${id}`)
        .send(winner)
        .end((err,res) =>{
            res.should.have.status(404);                    
            done();
            
        })
    });    
});

describe('/DELETE winners', () =>{

    it("should delete a winner", (done) => {

        chai.request(server)
        .delete(`/winners/${global_id}`)        
        .end((err,res) =>{
            res.should.have.status(204);                    
            done();
            
        })
    });

    it("should not delete a winner as ID does not exist", (done) => {

        const id = 1;
        chai.request(server)
        .delete(`/winners/${id}`)
        .end((err,res) =>{
            res.should.have.status(404);                            
            done();
            
        })
    });    
});