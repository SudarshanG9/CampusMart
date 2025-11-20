const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/api/stores', require('./routes/stores.js'));
app.use('/api/auth', require('./routes/auth.js')); 
// NOW WE ADD THE FINAL ROUTE
app.use('/api/reservations', require('./routes/reservations.js'));

app.listen(port, () => {
  console.log(`Server started successfully with ALL routes.`);
});