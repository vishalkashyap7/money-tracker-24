const mongoose = require('mongoose');
const { Schema } = mongoose;

const coinSchema = new Schema({
  id: String,
  symbol: String,
  name: String,
  image: String,
  current_price: Number,
  last_updated: Date
});

const dataSchema = new Schema({
  fetched_at: Date,
  coins: [coinSchema]
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;