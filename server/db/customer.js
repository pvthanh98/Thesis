const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const customerSchema = new Schema({
  email: {type:String, unique:true},
  password: { type:String },
  name:  String, 
  image: {type:String, default:"default.png"},
  address:   String,
  latitude: {type: Number, default:-1},
  longtitude: {type: Number, default:-1},
  phone: {type:String, unique:true},
  socket_id: String,
  timestamp: { type: Date, default: Date.now }
});

customerSchema.index({name:"text"});

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;