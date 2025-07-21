const { User, Role } = require("../Model/Index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/authentication");

module.exports = {
  login: async (userInfo) => {
    const { email, password } = userInfo;

    if (!email || !password) {
      throw new Error("Email và mật khẩu không được để trống");
    }

    try {
      // Get user with password using scope
      const user = await User.scope("withPassword").findOne({
        where: { email: email },
      });

      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }

      if (!user.password) {
        throw new Error("Lỗi xác thực tài khoản");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Mật khẩu không đúng");
      }

      const token = generateToken(user);
      const result = {
        user: user,
        accessToken: token,
      };
      return result;
      // res.status(200).json({ token, userId: user.user_id, isAdmin: user.isAdmin });
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw new Error("Đăng nhập không thành công");
    }
  },

  // kiêm tra emai, username đã tồn tại hay chưa
  signup: async (userInfo) => {
    const {
      email,
      password,
      first_name,
      last_name,
      user_name,
      phone,
      address,
    } = userInfo;
    try {
      const existingUser = await User.findOne({ where: { email: email } });
      const existingUserName = await User.findOne({
        where: { user_name: user_name },
      });
      if (existingUser) {
        throw new Error("Email đã được sử dụng");
      }
      if (existingUserName) {
        throw new Error("Username đã được sử dụng");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
        first_name: first_name,
        last_name: last_name,
        user_name: user_name,
        phone: phone,
        address: address,
      });

      return newUser;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw new Error(error.message || "Đăng ký không thành công");
    }
  },
  getUserInfo: async (userInfo) => {
    try {
      const user = await User.findOne({ where: { email: userInfo.email } });
      const role = await Role.findOne({ where: { role_id: userInfo.role_id } });
      return {
        user: user,
        tokenInfo: userInfo,
        role: role,
      };
    } catch (err) {
      console.error("Get user info fail:", error);
      throw new Error("Get user info fail: ", err);
    }
  },
};
