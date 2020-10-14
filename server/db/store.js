const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const { text } = require('body-parser');
const salt = bcrypt.genSaltSync(10);
const storeSchema = new Schema({
  email: {type:String, unique:true},
  password: { type:String },
  name:  String, 
  description: String,
  address:   String,
  latitude: {type:Number, default:-1},
  longtitude: {type:Number, default:-1},
  image: { type: String, default : "default_store.png"},
  rating: {
    five: { type:Number, default: 0 },
    four: { type:Number, default: 0 },
    three: { type:Number, default: 0 },
    two: { type:Number, default: 0 },
    one: { type:Number, default: 0 },
    total: { type:Number, default: 0 },
  },
  timestamp: { type: Date, default: Date.now },
  phone:{type:String}
});

const Store = mongoose.model('store', storeSchema);
module.exports = Store;