const bcrypt = require('bcryptjs');
const User = require("../db/customer");
const salt = bcrypt.genSaltSync(10);
module.exports = {
    createUser : (req, res) =>{
        console.log(req.body)
        User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            address: req.body.address,
            name: req.body.name
        })
        .then(reslt=>{res.sendStatus(200)})
        .catch(err => {res.status(400).send(err); throw err});
    },
    getUser : (req, res) => {
        const id = req.user.id;
        User.findById(id, "email address name phone image")
        .then(user=> {
            res.json(user);
        })
        .catch(err=>{
            res.sendStatus(500);
            throw err;
        })
    },
    updateUser : (req, res) => {
        const id = req.user.id;
        let data = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        };
        if(req.file) data.image = req.file.filename;
        User.findByIdAndUpdate(id,data)
        .then(()=> res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500);
            throw err;
        })
    },
    updateLocation : (req, res) => {
        const {lat,lng} = req.body;
        console.log(req.body)
        User.findByIdAndUpdate(req.user.id,{
            latitude:lat,
            longtitude: lng
        })
        .then(()=> res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(500);
            throw err;
        })
    },
}