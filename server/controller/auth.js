const jwt = require("jsonwebtoken");
const Store = require('../db/store');
const User = require("../db/customer");
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
                    image: user.image
                })
            } else res.sendStatus(401);
        })
        .catch(err => {
            res.sendStatus(401);
            throw err;
        })
    }
}