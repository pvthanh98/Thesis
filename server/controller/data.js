const Store = require("../db/store");
const Comment = require("../db/comment");
const Customer = require("../db/customer");
const Service = require("../db/service");
const Category = require("../db/category");
const Bill = require("../db/bill");
module.exports = {
  getStoreID: (req, res) => {
    Store.find({}, "_id name address").then((stores) => {
      res.send(stores);
    });
  },
  getCommentByuCustomerId: (req, res) => {
    const { customer_id } = req.params;
    Comment.find({ customer_id })
      .populate("store_id", "name")
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => console.log(err));
  },
  deleteComment: (req, res) => {
    const { id } = req.body;
    Comment.findByIdAndRemove(id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => sendStatus(400));
  },
  serviceCmt: (req, res) => {
    const index = Math.floor(
      Math.random() * Math.floor(commentSampe.length - 1)
    );
  },
  getUser: (req, res) => {
    Customer.find({}, "_id name email")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => console.log(err));
  },
  getServices: (req, res) => {
    Service.find({})
      .populate("store_id", "name")
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  },
  getCategory: (req, res) => {
    Category.find({}).then((cats) => res.send(cats));
  },
  modifyCategory: (req, res) => {
    const { name, id } = req.body;
    Category.findByIdAndUpdate(id, { name }).then((resl) => res.send("ok"));
  },
  getBill: (req, res) => {
    Bill.find({ store_id: req.params.store_id })
      .populate("services.service_id", "name")
      .populate("customer_id", "name")
      .sort({ timestamp: -1 })
      .limit(8)
      .then((bills) => {
        res.send(bills);
      })
      .catch((err) => res.send(err));
  },
  updateMoney: async (req, res) => {
    try {
      const { store_id } = req.params;
      let service_list = [];
      const services = await Service.find({ store_id });
      for(const service of services) {
          service_list.push({
              _id:service._id,
              price:service.price
          })
      }

      for (const service of service_list){
        await Service.findByIdAndUpdate(service._id,{
            price: service.price * 23000
        })
      }

      res.send("ok");
    } catch (e) {
      console.log(e);
    }
  },
};
