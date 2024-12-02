const express = require('express');
const History = require('../models/History');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware xác thực
const router = express.Router();

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get the user's eating history
 *     description: Fetch a list of dishes that the user has viewed.
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: A list of dishes in the user's history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, async (req, res) => {
  const { userId } = req.query;

  try {
    const history = await History.find({ user_id: userId }).populate('dish_id');
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
