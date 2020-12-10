const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  content: {type:String},
  store_id: {type: Schema.Types.ObjectId, ref:"store"},
  timestamp: { type: Date, default: Date.now },
  customer_id: { type: Schema.Types.ObjectId , ref : 'customer'},
});

module.exports = mongoose.model('report', reportSchema);