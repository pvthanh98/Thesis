const Comment = require('../db/comment');
const Store = require('../db/store');
module.exports = {
    postComment: async (req, res ) => {
        const customer_id = req.user.id;
        const {content, rating, store_id} = req.body;
        if(content!==""){
            Comment.create({
                customer_id,
                content,rating, store_id
            })
            .then(()=>res.sendStatus(200))
            .catch(err=>{
                res.sendStatus(400)
                throw err;
            });
        } else res.sendStatus(200);

        const result = await Store.findById(store_id)
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
        const store_id = req.params.store_id;
        Comment.find({store_id})
        .populate("customer_id", "name image")
        .then(comments=>res.json(comments))
        .catch(err=>{
            res.sendStatus(400);
            throw(err);
        })
    }
}