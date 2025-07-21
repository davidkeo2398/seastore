// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res, db) => {
//   const { name, username, email, password, address, phone } = req.body;

//   // kiểm tra email đã tồn tại
//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     if (results.length > 0) return res.status(400).json({ message: 'Email already registered' });

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert the new user into the database
//     db.query(
//       'INSERT INTO users (name, username, email, password, address, phone, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [name, username, email, hashedPassword, address, phone, 0],
//       (err, result) => {
//         if (err) return res.status(500).json({ message: 'Database error' });
//         res.status(201).json({ message: 'User registered successfully' });
//       }
//     );
//   });
// };