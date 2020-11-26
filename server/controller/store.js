const Store = require("../db/store");
const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const path = require("path");
const Jimp = require('jimp');
const Customer = require("../db/customer");
const Bill = require("../db/bill");
module.exports = {
    createStore : (req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        Store.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            city: req.body.city
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => { res.sendStatus(400); throw err;})       
    },
    getStore : async (req, res) =>{
        const {page} = req.params;
        const perPage = 8;
        let total_page = await Store.count({});
        total_page = Math.ceil(total_page/perPage);
        Store.find({},"name description address latitude longtitude image rating phone city")
            .limit(perPage)
            .skip(perPage *(page-1))
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
    getStoreFromCity : (req, res) =>{
        Store.find({city:req.params.city_id},"name description address latitude longtitude image rating phone city")
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
        console.log(data);
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
            Store.findById(id, "email name description latitude longtitude rating address image phone city")
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
        Store.findById(id, "email name description latitude longtitude rating address image phone city")
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
    getStoreByRating : async (req, res) => {
        const {page, city} = req.params;
        let conditions = {};
        if(city!=1){
            conditions.city = city;
        }
        const perPage = 8;
        let total_page = await Store.count({});
        total_page = Math.ceil(total_page/perPage);
        Store.find(conditions,"email name description latitude longtitude rating address image phone")
        .sort({"rating.total":-1})
        .limit(perPage)
        .skip(perPage *(page-1))
        .then(stores=> res.json({
            stores,
            total_page
        }))
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
            let store_temp = await Store.findById(result[i]._id, "email name description latitude longtitude rating address image phone");
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
    },

    modifyBody:(req, res) => {
        Store.findByIdAndUpdate(req.params.id,req.body)
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            res.send(err);
            throw err;
        })
    },
    getSearchSS: (req, res) => {
		const {name} = req.params;
		Store.find({$text:{$search:name}}, "email name description latitude longtitude rating address image phone")
		.then(stores=>{
			res.send(stores)
		})
		.catch(err=>{
			res.sendStatus(400);
			throw err;
		})
	},
}