const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId , ref : 'customer'},
  store_id: { type: Schema.Types.ObjectId, ref: 'store' },
  is_store: { type:Boolean, default:false },
  body: { type:String },
  is_read: {type:Boolean, default:false},
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('message', messageSchema);
module.exports = Message;