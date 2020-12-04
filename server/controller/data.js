const Store = require("../db/store");
const Comment = require("../db/comment");
const comment = require("../db/comment");
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
    }
}