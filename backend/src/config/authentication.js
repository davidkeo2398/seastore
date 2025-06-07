const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../Model/Index');

const generateToken = (user) => {
  const role = Role.findOne({ where: { role_id: user.role_id } });
  const payload = {
    user_id: user.id,
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    agency_rank_id: user.agency_rank_id,
    role_id: user.role_id,
    resources: user.resources,
    role_name: role.name
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    return result;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };