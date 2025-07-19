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


const {router, adminRouter} = require('./src/routes/index');
app.use('/api', router);
//admin
app.use('/api/admin', adminRouter);

// app.use('/api', momoRoute);

// Login route
// app.post('/login', (req, res) => {
//   authentication.login(req, res, db)
//     .then(data => {
//       if (data.token) {
//         return res.json({ redirect: data.user.isAdmin ? '/admin' : '/home', token: data.token, user: data.user });
//       } else {
//         return res.status(401).json({ message: data.message });
//       }
//     })
//     .catch(err => {
//       return res.status(500).json({ message: 'Đã xảy ra lỗi!' });
//     });
// });

// app.get('/login', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json({
//       message: 'Thành công',
//       data: users
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       message: 'Lỗi khi truy vấn dữ liệu',
//       error: error.message
//     });
//   }
// })

// // Signup route
// app.post('/signup', (req, res) => {
//   authentication.signup(req, res, db);
// });

// // Logout route
// app.post('/logout', (req, res) => {
//   // Client-side will handle token removal
//   res.json({ message: 'Đăng xuất thành công.' });
// });

app.get('/login',(req, res) => {
  res.json({"message": "hello"});
});

// Start server
app.listen(port, () => {
  console.log(`Máy chủ chạy trên cổng ${port}`);
});