const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cuuho', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>console.log("DB connected"));

const Service = require("./service");

Service.find({$text: {$search: "xe hơi"},store_id:"5f5c38d27ca26b11bcf25e47"}).then(reslt=>console.log(reslt)).catch(err=>console.log(err))