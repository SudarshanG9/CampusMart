const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    
    // The token is sent in the header like this: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (split at the space and take the second part)
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using our secret key from the .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user's ID to the request object so our routes can use it
            req.user = { id: decoded.id };
            
            // Move on to the next function in the chain (the route handler)
            next(); 
        } catch (error) {
            console.error('Token verification failed', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// --- THIS LINE IS CRUCIAL AND WAS LIKELY THE SOURCE OF THE ERROR ---
// It exports an object containing the 'protect' function.
module.exports = { protect };