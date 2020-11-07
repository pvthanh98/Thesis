const Rescue = require("../db/rescue");
module.exports = {
    createRescue: (req,res) => {
        const {store_id} = req.body;
        const customer_id = req.user.id
        Rescue.create({
            customer_id, store_id
        })
        .then(() => res.sendStatus(200))
        .catch(err=> {
            res.sendStatus(400);
            throw err;
        })
    },
}