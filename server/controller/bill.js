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
        Bill.find({})
        .populate("services.service_id", "name")
        .then((bills)=>{
            res.send(bills)
        })
        .catch(err=>res.send(err));
    },
}