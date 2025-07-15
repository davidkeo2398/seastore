const { verifyToken } = require("../config/authentication");
const { User, Role } = require("../Model/Index");


//401 k xác thực, token không hợp lệ
//403 k có quyền truy cập, token hợp lệ nhưng không có quyền
const authMiddleware = async (req, res, next) => {
  try {
    //kiểm tra token trong header
    const authHeader = req.headers.authorization; 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "No token provided",
        status: "error",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
        status: "error",
      });
    }
    //kiểm tra hợp lệ token
    const userInfo = verifyToken(token);
    const user = await User.findOne({
      where: { email: userInfo.email },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: "error",
      });
    }

    // Add user info to request
    req.user = user;
    req.userInfo = userInfo;
    next();
    console.log("here");
  } catch (error) {
    console.error("Authentication error:", error);
    //khi hết hạn token hoặc token không hợp lệ
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
      status: "error",
    });
  }
};

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "No token provided",
        status: "error",
      });
    }
    const userInfo = verifyToken(token);
    const user = await User.findOne({
      where: { email: userInfo.email },
    });
    const role = await Role.findOne({ where: { role_id: user.role_id } });
    if (user && role.role_name === "admin") {
      req.user = user;
      req.userInfo = userInfo;
      next();
    }
    else {
      return res.status(403).json({
        message: "You are not admin",
        error: "Permission denied",
        status: "forbiden",
      });
    }
  } catch (error) {
    console.error("Authentication admin error:", error);
    return res.status(401).json({
      message: "Authentication admin failed",
      error: error.message,
      status: "error",
    });
  }
};

module.exports = { authMiddleware, adminAuthMiddleware };
