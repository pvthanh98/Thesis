const store = require("../db/store");
const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');
const Store = require("../db/store");
const salt = bcrypt.genSaltSync(10);
const path = require("path");
const Jimp = require('jimp');
const Customer = require("../db/customer");
const Bill = require("../db/bill");
const { populate } = require("../db/store");
module.exports = {
    createStore : (req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        store.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            name: req.body.name,
            description: req.body.description,
            address: req.body.address
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => { res.sendStatus(400); throw err;})       
    },
    getStore : (req, res) =>{
        store.find({},"name description address latitude longtitude image rating phone")
            .then((stores)=>{
                res.json(stores)
            })
            .catch(err=>{
                res.sendStatus(400);
                throw err;
            })
    },
    modifyStore : async (req, res) =>{
        let data = {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            phone: req.body.phone,
            latitude : req.body.coordinate.split(",")[0],
            longtitude : req.body.coordinate.split(",")[1]
        }
        if(req.file) data.image = req.user.id+"_"+req.file.originalname
        Store.findByIdAndUpdate(req.user.id,data)
        .then(reslt=> {
            if(req.file){
                const pathName = path.join("./","public","images", req.user.id+"_"+req.file.originalname);
                Jimp.read(pathName, (err, lenna) => {
                    if (err) throw err;
                    lenna
                      .resize(500, 500) // resize
                      .quality(90) // set JPEG quality
                      .write(pathName); // save
                });
            }
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400);
        })
    },
    getStoreInfo : (req, res) =>{
        const { id } = req.user;
        if(id) {
            Store.findById(id, "email name description latitude longtitude rating address image phone")
            .then(store =>{
                if(store) res.send(store);
                return;
            })
            .catch(err => {
                res.sendStatus(400);
                throw err;
            })
        }
    },
    getStoreById : (req, res) => {
        const {id} = req.params;
        store.findById(id, "email name description latitude longtitude rating address image phone")
        .then(store=>res.json(store))
        .catch(err=>{res.sendStatus(403);throw err});
    },
    searchCustomer : (req, res) => {
        const {id} = req.params;
        Customer.findById(id,"name address phone image")
        .then(customerInfo => {
            res.send(customerInfo)
        })
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    },
    getStoreByRating :(req, res) => {
        store.find({},"email name description latitude longtitude rating address image phone")
        .sort({"rating.total":-1})
        .limit(4)
        .then(stores=> res.send(stores))
        .catch(err=> console.log(err));
    },
    getStoreBySale : async (req, res) => {
        const result = await Bill.aggregate([
            {
                $group: {_id:"$store_id", count: { $sum: 1 }}
            }
        ])
        .sort({count:-1})
        let stores = [];
        for(let i=0;i<result.length;i++){
            console.log(result[i])
            let store_temp = await store.findById(result[i]._id, "email name description latitude longtitude rating address image phone");
            stores.push(store_temp);
        }
        res.send(stores)
    },
    getRescueLocation: (req, res) => {
        const {id} = req.user;
        Bill.find({store_id:id},"coordinate customer_id timestamp total_cost")
        .populate("customer_id", "name")
        .then((bill)=> {
            res.send(bill)
        })
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    },
    updateRating: (req, res)=> {
        const {store_id,rating} = req.body;
        Store.findByIdAndUpdate(store_id,{
            rating
        })
        .then(()=>res.send("ok"))
        .catch(err=>res.sendStatus(400));
    }
}