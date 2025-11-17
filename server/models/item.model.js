const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  imageUrl: { type: String },
  // This creates a link between an item and its store
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;