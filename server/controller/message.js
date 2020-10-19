
const Message = require("../db/message");
const Store = require("../db/store");
const Customer = require("../db/customer");
module.exports = {
    getCustomerStore: async (req, res) => {
        try {
            const { store_id } = req.params;
            const customer_id = req.user.id;
            let messages = await Message.find({ customer_id, store_id })
            .populate('store_id')
            .populate("customer_id")
            if (messages.length > 0) {
                res.json({
                    info: {
                        customer:{
                            id: messages[0].customer_id._id,
                            name:messages[0].customer_id.name,
                            image:messages[0].customer_id.image
                        },
                        store: {
                            id:  messages[0].store_id._id,
                            name:  messages[0].store_id.name,
                            image:  messages[0].store_id.image 
                        }
                    },
                    content: messages
                })
            } else {
                let store = await Store.findById(store_id, "name image");
                let customer = await Customer.findById(customer_id, "name image");
                res.json({
                    info: {
                        customer: {
                            id: customer._id,
                            name: customer.name,
                            image: customer.image
                        },
                        store: {
                            id: store._id,
                            name:store.name,
                            image:store.image
                        }
                    },
                    content: []
                })
            }
        } catch (err) {
            res.sendStatus(400);
            throw err
        }
    },
    getStoreList: async (req, res) => {
        try{
            const {id} = req.user;
            const customer_id_list = await Message.aggregate([
                {
                    $match:{
                        store_id: id,
                    }
                },
                {
                    $group: {
                        _id: "$customer_id"
                    }
                }
            ]);
            let listMessages= [];
            for(let i=0;i<customer_id_list.length;i++){
                let msg = await Message
                                .findOne({customer_id:customer_id_list[i]._id})
                                .populate("customer_id", "name image")
                                .sort({timestamp:-1}).limit(1);
                listMessages.push(msg)
            }
            res.send(listMessages)
        } catch(e){
            res.sendStatus(400);
            throw e;
        }
    },
    getStoreToCustomer: async (req, res) => {
        try {
            const { customer_id } = req.params;
            const store_id = req.user.id;
            let messages = await Message.find({ store_id, customer_id })
            .populate('store_id')
            .populate("customer_id")
            if (messages.length > 0) {
                res.json({
                    info: {
                        customer:{
                            id: messages[0].customer_id._id,
                            name:messages[0].customer_id.name,
                            image:messages[0].customer_id.image
                        },
                        store: {
                            id:  messages[0].store_id._id,
                            name:  messages[0].store_id.name,
                            image:  messages[0].store_id.image 
                        }
                    },
                    content: messages
                })
            } else {
                let store = await Store.findById(store_id, "name image");
                let customer = await Customer.findById(customer_id, "name image");
                res.json({
                    info: {
                        customer: {
                            id: customer._id,
                            name: customer.name,
                            image: customer.image
                        },
                        store: {
                            id: store._id,
                            name:store.name,
                            image:store.image
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