// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminCredentials = {
  username: process.env.ADMIN_USERNAME || 'admin786',
  password: process.env.ADMIN_PASSWORD || '$2a$10$HWf.hxUxzpjslOOMkJeHSu1v.FpMZGV9ko2MCph9bOAqo0SvTLLnC', 
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username) {
    try {
      const isMatch = await bcrypt.compare(password, adminCredentials.password);
      
      if (isMatch) {
        const token = jwt.sign({ username: adminCredentials.username }, 'VerySecret', { expiresIn: '1h' });

        return res.status(200).json({
          message: 'Login successful',
          token: token,
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
