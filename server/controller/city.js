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
    }
}