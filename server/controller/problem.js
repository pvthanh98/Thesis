const Problem = require('../db/problem');
module.exports = {
    create : (req, res) => {
        Problem.create([
            {name: "Không thể khởi động máy"},
            {name: "Vấn đề với bánh xe"},
            {name: "Không thể khởi động máy"},
            {name: "Hệ thống phanh có vấn đề"},
            {name: "Khác"},
        ])
        .then(resp=>res.send("ok"))
    },
    get : (req, res) => {
        Problem.find({})
        .then((problems)=>res.json(problems))
        .catch(err=>{
            res.sendStatus(400);
            throw err;
        })
    }
}