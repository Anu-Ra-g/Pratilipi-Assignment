const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

// middleware for token authentication
const authenticateUser = async (req, res, next) => {
    const token  = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = { id: decoded.id, email: decoded.email }; 
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    authenticateUser
}