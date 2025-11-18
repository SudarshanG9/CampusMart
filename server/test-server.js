
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// This is the most important part.
// We are telling our server to use the CORS middleware for all incoming requests.
app.use(cors());

// This is a single, simple test route.
// When you visit http://localhost:5000/test, this function will run.
app.get('/test', (req, res) => {
    // This message will appear in your backend terminal if the request is successful.
    console.log('Request successfully received at the /test endpoint!');

    // This is the JSON data that will be sent back to your browser.
    res.json({ message: 'Success! CORS is working.' });
});

// This starts the server and makes it listen for connections on port 5000.
app.listen(port, () => {
  console.log(`Minimal test server is running on port: ${port}`);
  console.log('Now, open your web browser and go to http://localhost:5000/test');
});