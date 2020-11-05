const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId , ref : 'customer'},
  store_id: { type: Schema.Types.ObjectId, ref: 'store' },
  total_cost: { type:Number },
  services: [{
    service_id: {type: Schema.Types.ObjectId, ref: "service"},
    quantity: {type:Number, default:1}
  }],
  timestamp: { type: Date, default: Date.now },
  confirm:{type:Boolean, default:false},
  paid: {type:Boolean, default:false},
  coordinate: {
    lat: {type:Number},
    lng: {type:Number}
  }
});

module.exports = mongoose.model('bill', billSchema);