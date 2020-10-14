const mongoose = require('mongoose');
const { Schema } = mongoose;

const billDetailSchema = new Schema({
  bill_id: { type : Schema.Types.ObjectId , ref : 'bill'},
  service_id: { type : Schema.Types.ObjectId, ref: 'service' },
  quantity: { type : Number }
});

module.exports = mongoose.model('bill_detail', billDetailSchema);