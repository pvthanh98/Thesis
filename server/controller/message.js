
const Message = require("../db/message");
module.exports = {
    getCustomerMessagesById : (req, res) =>{
        const {id} = req.params;
        Message.find({customer_id:id})
        .then(messages=>res.json(messages))
        .catch(err=>{res.sendStatus(400); throw err});
    }
}