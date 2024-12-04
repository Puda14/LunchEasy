const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');  // Middleware xác thực JWT
const router = express.Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: "Get user profile"
 *     description: "Allow users to view their profile information."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "User profile data"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                   format: uri
 *                 address:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: "Unauthorized - Invalid token"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;  // Lấy user ID từ JWT token
  
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(userId).select('-password');  // Không trả về trường password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Trả về thông tin người dùng
      res.status(200).json({
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        address: user.address,
        created_at: user.createdAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: "Update user profile"
 *     description: "Allow users to update their profile information."
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               avatar:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Profile updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: "Bad request - Invalid data"
 *       401:
 *         description: "Unauthorized - Invalid token"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.put('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;  // Lấy user ID từ JWT token
    const { username, email, phone, avatar, address } = req.body;
  
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Cập nhật các trường thông tin người dùng
      if (username) user.username = username;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (avatar) user.avatar = avatar;
      if (address) user.address = address;
  
      // Lưu thông tin mới vào cơ sở dữ liệu
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
