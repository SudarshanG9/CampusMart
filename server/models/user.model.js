// --- DIAGNOSTIC ---
// If you see this message in your terminal, it PROVES this is the file being loaded.
console.log("************************************************************");
console.log("*** EXECUTING THE CORRECT user.model.js WITH 'srn' !!! ***");
console.log("************************************************************");
// --- END DIAGNOSTIC ---

const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);
module.exports = User;