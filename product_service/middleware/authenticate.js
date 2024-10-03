const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

// Middleware for token and role authentication
const authenticateRole = (requiredRole) => {
    return async (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

            if (req.user.role === requiredRole) {
                return next();
            } else {
                return res.status(403).json({ error: 'Access denied' });
            }
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
};

module.exports = { authenticateRole };