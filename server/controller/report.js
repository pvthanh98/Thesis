const Report = require("../db/report");
const Store = require("../db/store");
const mongoose = require("mongoose");
const { loadFont } = require("jimp");
const report = require("../db/report");
module.exports = {
  create: (req, res) => {
    const { content, store_id } = req.body;
    const customer_id = req.user.id;
    Report.create({
      customer_id,
      content,
      store_id,
    })
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.sendStatus(400);
        throw err;
      });
  },
  get: (req, res) => {
    const { store_id } = req.params;
    let conditions = {};
    if (store_id !== "all")
      conditions.store_id = store_id;
      Report.find(conditions)
      .populate("customer_id", "name image")
      .populate("store_id", "name image")
      .then((reports) => res.send(reports))
      .catch((err) => {
        res.sendStatus(400);
        throw err;
      });
  },
  getStoreReport: async (req, res) => {
    try {
      const reports = await Report.aggregate([
        {
          $group: {
            _id: "$store_id",
            count: { $sum: 1 },
          },
        },
      ]);
      let stores = [];
      for (const report of reports) {
        let resp = await Store.findById(report._id, "name image");
        stores.push({
          image: resp.image,
          _id: resp._id,
          name: resp.name,
          report_count: report.count,
        });
      }
      res.send(stores);
    } catch (e) {
      res.sendStatus(400);
      throw e;
    }
  },
  removeReport: (req, res) => {
    const {id} = req.body;
    Report.findByIdAndRemove(id, function(err,docs){
      if(!err) res.sendStatus(200);
      else res.sendStatus(400);
    });
  }
};
