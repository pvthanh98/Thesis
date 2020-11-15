const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId , ref : 'customer'},
  service_id: { type: Schema.Types.ObjectId, ref: 'service' },
  rating: { type:Number },
  content:{type:String, default:false},
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('service_comment', commentSchema);