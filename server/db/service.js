const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  store_id: { type: Schema.Types.ObjectId, ref: 'store' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: String,
  description: String,
  name: { type:String },
  price: { type:Number },
  quantity: Number,
  detail: String,
  rating: {
    five: { type:Number, default: 0 },
    four: { type:Number, default: 0 },
    three: { type:Number, default: 0 },
    two: { type:Number, default: 0 },
    one: { type:Number, default: 0 },
    total: { type:Number, default: 0 },
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('service', serviceSchema);