const SysUser = require("../db/sys_user");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = {
    createUser : (req, res) =>{
        SysUser.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            name: req.body.name,
            phone: req.body.phone
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => { res.sendStatus(400); throw err;});       
    },
    getUser : async (req, res) =>{
       SysUser.find({})
       .then(users=>res.json(users))
       .catch(err=>{
           res.sendStatus(400);
           throw err;
       })
    }
}