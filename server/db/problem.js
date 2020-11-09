const mongoose = require('mongoose');
const { Schema } = mongoose;

const problemSchema = new Schema({
  name: {type:String}
});

module.exports = mongoose.model('problem', problemSchema);