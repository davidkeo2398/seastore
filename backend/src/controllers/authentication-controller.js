const { getUserInfo } = require("../services/auth-service");
const { authService } = require("../services/index");

module.exports = {
  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json({
        message: "Đăng nhập thành công",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        message: "Đăng nhập không thành công",
        data: [],
        error: error.message,
      });
    }
  },

  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);

      return res.status(200).json({
        message: "Đăng ký thành công",
        data: result,
      });
    } catch (error) {
      console.error("Đăng ký không thành công:", error);
      return res.status(400).json({
        message: `Đăng ký không thành công: ${error.message}`,
      });
   
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const result = await authService.getUserInfo(req.userInfo);

      return res.status(200).json({
        message: "Get user info success",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get user info fail",
        data: [],
        error: error.message,
      });
    }
  },
};
