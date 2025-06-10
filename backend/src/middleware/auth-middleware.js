const { verifyToken } = require("../config/authentication");
const { User } = require("../Model/Index");

// Export the middleware function directly
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                message: 'No token provided',
                status: 'error'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Invalid token format',
                status: 'error'
            });
        }

        const userInfo = verifyToken(token);
        const user = await User.findOne({
            where: { email: userInfo.email }
        });

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                status: 'error'
            });
        }

        // Add user info to request
        req.user = user;
        req.userInfo = userInfo;
        next();
        console.log('here')


    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            message: 'Authentication failed',
            error: error.message,
            status: 'error'
        });
    }
};

module.exports = authMiddleware;