const mongoose = require('mongoose');
const { Schema } = mongoose;
const categorySchema = new Schema({
  name:  String, 
  timestamp: { type: Date, default: Date.now }
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;