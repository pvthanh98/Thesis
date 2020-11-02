const jwt = require("jsonwebtoken");
const Bill = require('../db/bill');
module.exports = {
    postBill: (req,res) => {
        let data = {...req.body};
        data.store_id =  req.user.id;
        console.log(data)
        Bill.create(data).then(()=>{
            res.sendStatus(200);
        }).catch(err=>{
            res.sendStatus(500);
            throw err;
        })
        
    },
    getBill: (req,res) => {
        Bill.find({store_id:req.user.id})
        .populate("services.service_id", "name")
        .populate("customer_id", "name")
        .then((bills)=>{
            res.send(bills)
        })
        .catch(err=>res.send(err));
    },

    deleteBill: async (req, res) => {
        const {bill_ids} = req.body;
        try{
            for(let i=0;i<bill_ids.length;i++){
                await Bill.findByIdAndDelete(bill_ids[i]);
            }
            res.send("ok")
        } catch(e){
            res.sendStatus(400);
            throw e;
        }
    },
    confirmPayment :async (req,res) => {
        const {bill_ids} = req.body;
        try{
            for(let i=0;i<bill_ids.length;i++){
                await Bill.findByIdAndUpdate(bill_ids[i],{paid:true});
            }
            res.send("ok")
        } catch(e){
            res.sendStatus(400);
            throw e;
        }
    },
    getBillByID : (req, res) => {
        const {id} = req.params;
        Bill.findById(id)
        .populate("customer_id", "name image address phone")
        .populate("services.service_id", "name price total")
        .then((bill)=>{
            res.json(bill)
        })
        .catch(err=> {
            if(err) {
                res.sendStatus(400);
                throw err;
            }
        })
    },
    modifyBillTemp: (req, res) => {
        const {id} = req.params;
        Bill.findByIdAndUpdate(id,req.body)
        .then(()=> res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    },
    getCustomerBill : (req, res) => {
        const customer_id = req.user.id;
        Bill.find({customer_id})
        .populate("services.service_id","name price")
        .populate("store_id", "name")
        .then((bills)=>{
            res.json(bills);
        })
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        });
    }
}