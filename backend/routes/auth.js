const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Đường dẫn đến mô hình User

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Đặt trong biến môi trường trong thực tế

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Sign Up
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/signup', async (req, res) => {
  const { username, email, password, phone, avatar, address } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash password và tạo người dùng mới
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      avatar,
      address,
    });

    res.status(201).json({ message: 'User created successfully.', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials.' });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User Log Out
 *     description: Logs out the user (client-side token deletion).
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully.
 */
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully.' });
});

module.exports = router;
