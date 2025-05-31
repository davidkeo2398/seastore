exports.login = async (req, res, db) => {
  const { email, password } = req.body;

  // Retrieve the user from the database
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate a JWT token
    const token = jwt.sign(
      { iduser: user.iduser, isAdmin: user.isAdmin },
      'your_jwt_secret',
      { expiresIn: '4h' }
    );

    res.json({ token, user });
  });
};
