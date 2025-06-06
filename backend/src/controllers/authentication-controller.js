const { authService } = require('../services/index');

const login = async (req, res) => {
    try {
        const result = await authService.loginService(req.body);

        return res.status(200).json({
            message: "Đặng nhập thành công",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Đặng nhập không thành công",
            data: [],
            error: error.message
        });
    }

}

const signup = async (req, res) => {
    try {
        const result = await authService.signupService(req.body);

        return res.status(200).json({
            message: "Đăng ký thành công",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Đăng ký không thành công",
            data: [],
            error: error.message
        });
    }
}

module.exports = {
    login, 
    signup
};