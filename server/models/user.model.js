const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // You can add more fields later, like the store this user owns
  // store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;