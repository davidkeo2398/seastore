const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authentication = require('./authentication');
const db = require('./src/config/dbcontext');
const { Sequelize } = require('sequelize');
const { User } = require('./src/Model/Index');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// CORS headers (redundant with cors middleware, but kept for clarity)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware for user authentication
const middleware = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(403).json({ message: 'Không có mã nào được cung cấp' });
  }
  const token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Không thể xác thực mã' });
    }
    req.userId = decoded.iduser;
    next();
  });
};

// Middleware for admin authentication
const adminMiddleware = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(403).json({ message: 'Không có mã nào được cung cấp' });
  }
  const token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Không thể xác thực mã' });
    }
    if (decoded.isAdmin !== 1) {
      return res.status(401).json({ message: 'Không đủ quyền truy cập' });
    }
    req.userId = decoded.iduser;
    next();
  });
};
const {router, adminRouter} = require('./src/routes/index');
app.use('/api', router);
//admin
app.use('/api/admin', adminRouter);

app.get('/login',(req, res) => {
  res.json({"message": "hello"});
});

// Start server
app.listen(port, () => {
  console.log(`Máy chủ chạy trên cổng ${port}`);
});