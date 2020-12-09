const city = require("../db/city");
const City = require("../db/city");
module.exports = {
    getCity: (req,res) => { 
        City.find({})
        .then(cities => res.send(cities))
        .catch(err=>{
            res.send(err);
            throw err;
        })
    },
    postCity: (req,res) => { 
        City.create({
            name: req.body.name
        })
        .then(()=>res.sendStatus(200))
        .catch(err=> {
            res.send(err);
            throw err;
        })
    },
    deleteCity: (req, res) => {
        const {id} = req.body;
        City.findByIdAndRemove(id)
        .then(()=>{
            res.sendStatus(200)
        })
        .catch(err=> {
            res.status(400).send({
                "error": "I have no ideas with this error"
            });
            throw err;
        })
    },
    modifyCity: (req, res) => {
        const {id, name} = req.body;
        City.findByIdAndUpdate(id, {
            name
        })
        .then(()=>{
            res.sendStatus(200)
        })
        .catch(err=> {
            res.status(400).send({
                "error": "I have no ideas with this error"
            });
            throw err;
        })
    }
}