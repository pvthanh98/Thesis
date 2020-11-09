const mongoose = require('mongoose');
const { Schema } = mongoose;

const rescueSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId , ref : 'customer'},
  store_id: { type: Schema.Types.ObjectId, ref: 'store' },
  problem:{type:Schema.Types.ObjectId, ref: 'problem'},
  is_complete: {type:Boolean, default:false},
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('rescue', rescueSchema);