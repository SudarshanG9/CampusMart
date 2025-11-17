const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // You can link a user to a specific store later
  // store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;