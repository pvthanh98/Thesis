
const Message = require("../db/message");
const Store = require("../db/store");
const Customer = require("../db/customer");
const mongoose = require('mongoose');
module.exports = {
    getCustomerStore: async (req, res) => {
        try {
            const { store_id } = req.params;
            const customer_id = req.user.id;
            console.log({ customer_id, store_id });
            let messages = await Message.find({ customer_id, store_id })
            .populate('store_id', 'name image phone')
            .populate("customer_id", 'name image phone')
            .limit(10)
            .sort({timestamp:-1});
            messages.reverse();
        
            if (messages.length > 0) {
                res.json({
                    info: {
                        customer:{
                            id: messages[0].customer_id._id,
                            name:messages[0].customer_id.name,
                            phone:messages[0].customer_id.phone,
                            image:messages[0].customer_id.image
                        },
                        store: {
                            id:  messages[0].store_id._id,
                            name:  messages[0].store_id.name,
                            phone:  messages[0].store_id.phone,
                            image:  messages[0].store_id.image 
                        }
                    },
                    content: messages
                })
            } else {
                let store = await Store.findById(store_id, "name image phone");
                let customer = await Customer.findById(customer_id, "name image phone");
                res.json({
                    info: {
                        customer: {
                            id: customer._id,
                            name: customer.name,
                            phone: customer.phone,
                            image: customer.image
                        },
                        store: {
                            id: store._id,
                            name:store.name,
                            phone: store.phone,
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
        try {
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
            let unread =0;
            for(let i=0;i<customer_id_list.length;i++){
                let msg = await Message
                                .findOne({customer_id:customer_id_list[i]._id})
                                .populate("customer_id", "name image")
                                .sort({timestamp:-1}).limit(1);
                if(!msg.is_read && !msg.is_store) unread++;
                listMessages.push(msg)
            }
            listMessages.sort((a,b)=>(b.timestamp-a.timestamp));
            res.send({
                unread,
                messages:listMessages
            })
        } catch(e){
            res.sendStatus(400);
            throw e;
        }
    },
    getUserList: async (req, res)=>{
        try {
            const id = mongoose.Types.ObjectId(req.user.id);
            const store_id_list = await Message.aggregate([
                {
                    $match:{
                        customer_id: id
                    }
                },
                {
                    $group: {
                        _id: "$store_id"
                    }
                }
            ]);
            let listMessages= [];
            let unread =0;
            for(let i=0;i<store_id_list.length;i++){
                let msg = await Message
                                .findOne({store_id:store_id_list[i]._id}, "name body is_read is_store timestamp")
                                .populate("store_id", "name image")
                                .sort({timestamp:-1}).limit(1);
                if(!msg.is_read && msg.is_store) unread++;
                listMessages.push(msg)
            }
            listMessages.sort((a,b)=>(b.timestamp-a.timestamp));
            res.send({
                unread,
                messages:listMessages
            })
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
            .populate('store_id', "name image phone")
            .populate("customer_id", "name image phone")
            .limit(10)
            .sort({timestamp:-1});

            messages.reverse();

            if (messages.length > 0) {
                res.json({
                    info: {
                        customer:{
                            id: messages[0].customer_id._id,
                            name:messages[0].customer_id.name,
                            phone:messages[0].customer_id.phone,
                            image:messages[0].customer_id.image
                        },
                        store: {
                            id:  messages[0].store_id._id,
                            name:  messages[0].store_id.name,
                            phone:  messages[0].store_id.phone,
                            image:  messages[0].store_id.image 
                        }
                    },
                    content: messages
                })
            } else {
                let store = await Store.findById(store_id, "name image phone");
                let customer = await Customer.findById(customer_id, "name image phone");
                res.json({
                    info: {
                        customer: {
                            id: customer._id,
                            name: customer.name,
                            phone: customer.phone,
                            image: customer.image
                        },
                        store: {
                            id: store._id,
                            name:store.name,
                            phone:store.phone,
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
    readMessage: (req, res) => {
        console.log(`read msg id ${req.body.id}`);
        res.send("ok")
    }
}