const Comment = require('../db/service_comment');
const Service = require('../db/service');
const mongoose = require("mongoose");
module.exports = {
    postComment: async (req, res ) => {
        const customer_id = req.user.id;
        const {content, rating, service_id} = req.body;
        console.log(customer_id);
        if(content!==""){
            Comment.create({
                customer_id: mongoose.Schema.Types.ObjectId(customer_id),
                content,rating, service_id
            })
            .then(()=>res.sendStatus(200))
            .catch(err=>{
                res.sendStatus(400)
                throw err;
            });
        } else res.sendStatus(200);

        const result = await Service.findById(service_id)
        let oldRating = {...result.rating};
        console.log(oldRating)
        switch(rating){
            case 1: 
                oldRating.one +=1;
                break;
            case 2:
                oldRating.two +=1;
                break;
            case 3:
                oldRating.three +=1;
                break;
            case 4:
                oldRating.four +=1;
                break;
            case 5: 
                oldRating.five +=1;
                break
        }
        
        let total =Math.round(( oldRating.one + oldRating.two * 2 + oldRating.three*3+oldRating.four*4+oldRating.five*5) 
        / (oldRating.one +oldRating.two +oldRating.three +oldRating.four +oldRating.five));
        oldRating.total = total;

        result.rating={...oldRating};
        result.save();
    },
    getComment: (req, res) => {
        const service_id = req.params.service_id;
        Comment.find({service_id})
        .populate("customer_id", "name image")
        .then(comments=>res.json(comments))
        .catch(err=>{
            res.sendStatus(400);
            throw(err);
        })
    }
}