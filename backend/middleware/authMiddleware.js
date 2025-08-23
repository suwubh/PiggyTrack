const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        let message = 'Unauthorized: Invalid token.';
        if (err.name === 'TokenExpiredError') {
            message = 'Unauthorized: Token expired.';
        } else if (err.name === 'JsonWebTokenError') {
            message = 'Unauthorized: Invalid token signature.';
        }
        res.status(401).json({ message: message });
    }
};

module.exports = authMiddleware;
