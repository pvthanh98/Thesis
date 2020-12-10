const Report = require("../db/report");
module.exports = {
  create: (req, res) => {
    const {content, store_id} = req.body;
    const customer_id = req.user.id;
    Report.create({
        customer_id, content, store_id
    })
    .then(()=> res.sendStatus(200))
    .catch(err=>{
        res.sendStatus(400);
        throw err;
    });
  },
  get:(req, res) => {
      Report.find({})
      .then(reports=>res.send(reports))
      .catch(err=>{
          res.sendStatus(400);
          throw err;
      })
  }
};
