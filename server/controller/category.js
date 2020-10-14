const Category = require("../db/category");
module.exports = {
    postCategory: (req,res) => {
        Category.create({
            name: req.body.name
        })
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    },

    getCategory: (req, res) => {
        Category.find({})
        .then((categories)=>res.status(200).json(categories))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    }
}