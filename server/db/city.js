const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: {type:String}
});

module.exports = mongoose.model('city', citySchema);