
const Message = require("../db/message");
module.exports = {
    getCustomerStore : (req, res) =>{
        const {customer_id, store_id} = req.params;
        Message.find({customer_id, store_id})
        .populate("store_id", "name image")
        .populate("customer_id", "name image")
        .then(messages=>res.json(messages))
        .catch(err=>{res.sendStatus(400); throw err});
    }
}