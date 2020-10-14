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
    }
}