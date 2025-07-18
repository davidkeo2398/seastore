// authentication.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, db) => {
  const { name, username, email, password, address, phone } = req.body;

  try {
    // Check if user already exists
    const [existingUsers] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ? OR username = ?", [
        email,
        username,
      ]);
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "Email hoặc username đã tồn tại." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    const [result] = await db
      .promise()
      .query(
        "INSERT INTO users (name, username, email, password, address, phone, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, username, email, hashedPassword, address, phone, 0]
      );

    return res.status(201).json({ message: "Đăng ký thành công." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi đăng ký." });
  }
};

const login = async (req, res, db) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [users] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return { message: "Email không tồn tại." };
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: "Mật khẩu không đúng." };
    }

    // Generate JWT token
    const token = jwt.sign(
      { iduser: user.iduser, isAdmin: user.isAdmin },
      "your_jwt_secret",
    );

    return {
      token,
      user: { iduser: user.iduser, email: user.email, isAdmin: user.isAdmin },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Đã xảy ra lỗi khi đăng nhập.");
  }
};

module.exports = { signup, login };
