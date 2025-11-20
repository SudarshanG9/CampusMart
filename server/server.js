const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// --- MIDDLEWARE SETUP ---

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

app.use('/api/stores', require('./routes/stores'));


// --- START THE SERVER ---
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});