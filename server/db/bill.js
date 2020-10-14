const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId , ref : 'customer'},
  store_id: { type: Schema.Types.ObjectId, ref: 'store' },
  total_cost: { type:Number },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('bill', billSchema);