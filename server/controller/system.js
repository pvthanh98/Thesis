const SysUser = require("../db/sys_user");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const Store = require("../db/store");
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
    },

    getStores: async (req,res) => {
        const {page, active, rating} = req.params;
        let conditions;
        if(active==1 || active==-1){
            conditions = {
                active:active
            }
        }
        if(rating==1 || rating==-1){
            conditions = {
                "rating.total": rating
            }
        }
        console.log(conditions);
        const perPage = 8;
        let total_page = await Store.count({});
        Store.find({},"name description address latitude longtitude image rating phone city active")
            .limit(perPage)
            .skip(perPage *(page-1))
            .sort(conditions)
            .then((stores)=>{
                res.json({
                    stores,
                    total_page
                })
            })
            .catch(err=>{
                res.sendStatus(400);
                throw err;
            })
    },

    activeStore: (req,res) => {
        const {store_id, actions} = req.body;
        Store.findByIdAndUpdate(store_id,{active:actions})
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    },
    getProfile: (req, res) => {
        const user_id = req.user.id;
        SysUser.findById(user_id,"image email name phone timestamp",function(err,results){
            if(!err) {
                res.json(results);
            } else {
                res.sendStatus(400);
                throw err;
            }
        });
    },
    modify: async (req, res) => {
        let data = {
            name: req.body.name,
            phone: req.body.phone
        }
        const user = await SysUser.findById(req.user.id)
        if(req.body.password && req.body.currentPass) {
            if(bcrypt.compareSync(req.body.currentPass, user.password)){
                const password = bcrypt.hashSync(req.body.password, salt);
                data.password = password;
            } else {
                res.status(400).json({err:"Password incorrect"})
                return;
            }
        }
        if(req.file) data.image = req.user.id+"_"+req.file.originalname;
        SysUser.findByIdAndUpdate(req.user.id,data)
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    }

}