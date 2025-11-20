const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/user.model');

router.post('/login', async (req, res) => {
    try {
        const { srn, password } = req.body;

        // 1. Find the user by their SRN
        const user = await Student.findOne({ srn });
        if (!user) {
            // User not found in the database
            return res.status(400).json({ message: "Invalid SRN or Password." });
        }

        // 2. Compare the password from the form with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Passwords do not match
            return res.status(400).json({ message: "Invalid SRN or Password." });
        }

        // 3. If everything is correct, create a token and send it back
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, srn: user.srn } });

    } catch (err) {
        console.error("Login route encountered a server error:", err);
        res.status(500).send('Server error');
    }
});

module.exports = router;