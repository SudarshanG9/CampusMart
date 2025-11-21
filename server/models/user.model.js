const mongoose = require('mongoose');

// The schema is correct and does not need to change
const userSchema = new mongoose.Schema({
  srn: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

// --- THIS IS THE CHANGE ---
// We are changing the registered name of the model from 'User' to 'Student'
const Student = mongoose.model('Student', userSchema);

module.exports = Student;