const Store = require("../db/store");
const Comment = require("../db/comment");
const Customer = require("../db/customer");
const Service = require("../db/service");
module.exports = { 
    getStoreID: (req, res) => {
        Store.find({},"_id name address")
        .then(stores=> {
            res.send(stores);
        })
    },
    getCommentByuCustomerId: (req, res) => {
        const {customer_id} = req.params;
        Comment.find({customer_id})
        .populate("store_id","name")
        .then(comments=>{
            res.send(comments);
        })
        .catch(err=>console.log(err));
    },
    deleteComment: (req, res) => {
        const {id} = req.body;
        Comment.findByIdAndRemove(id)
        .then(()=>{
            res.sendStatus(200);
        })
        .catch(err=>sendStatus(400))
    },
    serviceCmt :(req, res) => {
        const index = Math.floor(Math.random() * Math.floor(commentSampe.length-1))
        
    },
    getUser : (req, res) => {
        Customer.find({},"_id name email")
        .then(users => {
            res.json(users);
        })
        .catch(err=>console.log(err));
    },
    getServices: (req, res) => {
        Service.find({})
        .populate("store_id", "name")
        .then(data=> {
            res.send(data);
        })
        .catch(err=>{
            res.sendStatus(400);
        })
    }
}
