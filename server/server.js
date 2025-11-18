const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// --- MIDDLEWARE SETUP ---
// This is the most important part. Middleware runs in the order it is defined.

// 1. CORS Middleware: This MUST come first.
// It attaches the necessary headers to every response, allowing cross-origin requests.
app.use(cors());

// 2. JSON Body Parser: This allows your server to understand JSON sent from the frontend.
app.use(express.json());


// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


// --- API ROUTES ---
// These are defined AFTER the middleware. The request will only get here
// if it has already passed through `cors()` and `express.json()`.
app.use('/api/stores', require('./routes/stores'));


// --- START THE SERVER ---
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});