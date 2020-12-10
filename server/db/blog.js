const mongoose = require('mongoose');
const { Schema } = mongoose;
const blogSchema = new Schema({
  name: String,
  about:String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('blog', blogSchema);