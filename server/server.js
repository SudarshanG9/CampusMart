const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// API Routes
const storeRouter = require('./routes/stores');
const authRouter = require('./routes/auth'); // <-- ADD THIS
const itemRouter = require('./routes/items'); // <-- ADD THIS

app.use('/api/stores', storeRouter);
app.use('/api/auth', authRouter); // <-- ADD THIS
app.use('/api/items', itemRouter); // <-- ADD THIS

app.listen(port, () => {
  // ...
});