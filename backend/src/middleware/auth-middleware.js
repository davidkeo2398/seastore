const e = require("express");
const { verifyToken } = require("../config/authentication");
const { User } = require("../Model/Index");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]; // Lấy phần access_token
            const userInfo = verifyToken(token);
            const isExistedUser = User.findOne({ where: { email: userInfo.email } });
            if (isExistedUser) {
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
            console.log('Access token:', token);
        } else {
            console.log('Authorization header không hợp lệ!');
            res.status(403).json({ message: 'Forbiden' });
        }
    } catch (error) {
        console.error('Lỗi xác thực:', error);
        res.status(401).json({ message: error.message });
    }


};

module.exports = { authMiddleware };