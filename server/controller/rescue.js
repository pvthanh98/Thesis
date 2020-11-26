const Rescue = require("../db/rescue");
const User = require("../db/customer");
const user = require("./user");
module.exports = {
    createRescue: (req,res) => {
        console.log("controller/rescue.js",req.body);
        const {store_id, problem, coordinate} = req.body;
        const customer_id = req.user.id
        Rescue.create({
            customer_id, store_id, problem,coordinate
        })
        .then(() => res.sendStatus(200))
        .catch(err=> {
            res.sendStatus(400);
            throw err;
        })
    },
    getRescue: async (req,res) => {
        const {page} = req.params;
        const perPage = 5;
        let total_page = await Rescue.count({store_id:req.user.id});
        total_page = Math.ceil(total_page/perPage); 

        Rescue.find({
            store_id: req.user.id
        })
        .populate("customer_id", "name latitude longtitude phone address image")
        .populate("problem")
        .sort({is_complete:1})
        .limit(perPage)
        .skip(perPage *(page-1))
        .then(rescuelist=> {
            res.json({
                rescuelist,
                total_page
            });
        })
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
    },
    modifyAllRescue: async (req, res) => {
        const rescue_id  = req.params.id;
        Rescue.findByIdAndUpdate(rescue_id,req.body)
        .then(function(){
            res.sendStatus(200)
        })
        .catch(err=>res.sendStatus(400))
    },
    searchRescue: async (req, res) => {
        try{
            const {name} = req.params;
            const users = await User.find({$text:{$search:name}}, "name");
            let rescuelist = [];
            for(let user of users) {
                let rescue = await Rescue.find({customer_id: user._id, store_id: req.user.id})
                                        .populate("customer_id", "name latitude longtitude phone address image")
                                        .populate("problem");
                rescuelist.push(...rescue);
            }
            res.json({
                rescuelist,
                total_page:-1
            });
        } catch(err){
            console.log(err)
        }
    },
    searchRescueByDate : async (req, res) => {
        const date = new Date(req.params.date);
        const day = date.getDate() +1;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        console.log(day, month, year,req.params.date);
        
        const id_list = await Rescue.aggregate([
            {
                $project: {
                    "year": {
                        "$year": "$timestamp"
                      },
                      "month": {
                        "$month": "$timestamp"
                      },
                      "day": {
                        "$dayOfMonth": "$timestamp"
                      },
                      store_id:1
                }
            },
            {
                $match: {
                    store_id: req.user.id,
                    day,month,year
                }
            }
        ]);
        let finalRescue = [];
        for (let id of id_list) {
            let rescue = await Rescue.findById(id._id)
                                        .populate("customer_id", "name latitude longtitude phone address image")
                                        .populate("problem");
            finalRescue.push(rescue)
        }

        res.json({
            rescuelist:finalRescue,
            total_page: -1
        })

    },
    getRescueMobile: (req, res) => {
        Rescue.find({
            store_id: req.user.id,
            is_complete: false
        })
        .populate("customer_id", "name latitude longtitude phone address image")
        .populate("problem")
        .then(rescuelist=> {
            res.json({
                rescuelist
            });
        })
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })    
    }
}