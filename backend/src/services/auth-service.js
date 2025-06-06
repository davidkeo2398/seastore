const { User } = require('../Model/Index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/authentication');



const loginService = async (userInfo) => {
    console.log('userInfo', userInfo);
    const { email, password } = userInfo;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error('Nguời dùng không tồn tại');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Mật khẩu không đúng');
        }

        const token = generateToken(user);
        const result = {
            user: user,
            accessToken: token,
        }
        return result;
        // res.status(200).json({ token, userId: user.user_id, isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        throw new Error('Đăng nhập không thành công');
    }
}

const signupService = async (userInfo) => {
    const { email, password, first_name, last_name, user_name, phone, address } = userInfo;
    try {
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            throw new Error('Email đã được sử dụng');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            phone: phone,
            address: address
        });

        return newUser;
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        throw new Error('Đăng ký không thành công');
    }
}

module.exports = {
    loginService,
    signupService
}