
const Message = require("../db/message");
const Store = require("../db/store");
const Customer = require("../db/customer");
module.exports = {
    getCustomerStore: async (req, res) => {
        try {
            const { store_id } = req.params;
            const customer_id = req.user.id;
            let messages = await Message.find({ customer_id, store_id })
                .populate("store_id", "name image")
                .populate("customer_id", "name image")
            if (messages.length > 0) {
                res.json({
                    info: {
                        customer:{
                            id: messages[0].customer_id._id,
                            name:messages[0].customer_id.name
                        },
                        store: {
                            id:  messages[0].store_id._id,
                            name:  messages[0].store_id.name 
                        }
                    },
                    content: messages
                })
            } else {
                let store = await Store.findById(store_id, "name");
                let customer = await Customer.findById(customer_id, "name");
                res.json({
                    info: {
                        customer: {
                            id: customer._id,
                            name: customer.name
                        },
                        store: {
                            id: store._id,
                            name:store.name
                        }
                    },
                    content: []
                })
            }
        } catch (err) {
            res.sendStatus(400);
            throw err
        }
    }
}