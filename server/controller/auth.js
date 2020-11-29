const jwt = require("jsonwebtoken");
const Store = require('../db/store');
const User = require("../db/customer");
const SysAdmin = require("../db/sys_user")
const bcrypt = require('bcryptjs');
module.exports = {
    login: (req,res) => {
        Store.findOne({email: req.body.email}).then(store => {
            if(store && bcrypt.compareSync(req.body.password, store.password)) {
                let admin_token = jwt.sign({
                    id: store._id,
                    name: store.name,
                    type:"store"
                }, process.env.SECRET_KEY);
                res.status(200).json({
                    admin_token,
                    admin_id: store._id,
                    admin_name: store.name,
                    admin_avt: store.image
                });    
                return;
            }
            res.sendStatus(401)
        });
    },
    userLogin : (req, res) => {
        User.findOne({email:req.body.email})
        .then(user => {
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    type: 'user'
                }, process.env.SECRET_KEY);
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    user_token: token,
                    image: user.image,
                    address: user.address
                })
            } else res.sendStatus(401);
        })
        .catch(err => {
            res.sendStatus(401);
            throw err;
        })
    },
    sysLogin: (req, res) => {
        SysAdmin.findOne({email: req.body.email}).then(sys_user => {
            if(sys_user && bcrypt.compareSync(req.body.password, sys_user.password)) {
                let sys_token = jwt.sign({
                    id: sys_user._id,
                    name: sys_user.name,
                    type:"sys_user"
                }, process.env.SECRET_SYSKEY);
                res.status(200).json({
                    sys_token,
                    sys_id: sys_user._id,
                    sys_name: sys_user.name,
                    sys_avt: sys_user.image
                });    
                return;
            }
            res.sendStatus(401)
        });
    }
}