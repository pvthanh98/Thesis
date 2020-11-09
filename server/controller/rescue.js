const Rescue = require("../db/rescue");
module.exports = {
    createRescue: (req,res) => {
        const {store_id, problem} = req.body;
        const customer_id = req.user.id
        Rescue.create({
            customer_id, store_id, problem
        })
        .then(() => res.sendStatus(200))
        .catch(err=> {
            res.sendStatus(400);
            throw err;
        })
    },
    getRescue: (req,res) => {
        Rescue.find({
            store_id: req.user.id
        })
        .populate("customer_id", "name latitude longtitude phone address image")
        .populate("problem")
        .sort({is_complete:1})
        .then(rescuelist=> res.json(rescuelist))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    },
    modifyRescue: async (req, res) => {
        let rescue = await Rescue.findById(req.body.id);
        if(rescue.store_id.toString() == req.user.id.toString()) {
            rescue.is_complete = true;
            rescue.save(()=>{
                console.log("saved");
                res.sendStatus(200)
            })
        } else res.sendStatus(400)
    }
}