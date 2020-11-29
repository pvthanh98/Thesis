const mongoose = require('mongoose');
const { Schema } = mongoose;
const sysSchema = new Schema({
  email: {type:String, unique:true},
  password: { type:String },
  name:  String, 
  phone:{type:String},
  image: { type: String, default : "default_sys.jpg"},
  timestamp: { type: Date, default: Date.now },
});

sysSchema.index({name:'text'})
module.exports = mongoose.model('sys_user', sysSchema);
