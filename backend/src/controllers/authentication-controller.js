const { authService } = require('../services/index');



module.exports = {
    login: async (req, res) => {
        try {
            const result = await authService.login(req.body);

            return res.status(200).json({
                message: "Đăng nhập thành công",
                data: result
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Đăng nhập không thành công",
                data: [],
                error: error.message
            });
        }

    },

    signup: async (req, res) => {
        try {
            const result = await authService.signup(req.body);

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
};