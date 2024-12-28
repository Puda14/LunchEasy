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
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
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
    const history = await History.find({ user_id: userId })
    .populate({
      path: 'dish_id',
      populate: {
        path: 'restaurant_id',
      }
    })
    .lean();    
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /history:
 *   post:
 *     summary: Save user's dish viewing history
 *     description: Records when a user views a specific dish
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - dishId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               dishId:
 *                 type: string
 *                 description: The ID of the viewed dish
 *     responses:
 *       201:
 *         description: History entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *            
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, async (req, res) => {
  const { userId, dishId } = req.body;

  if (!userId || !dishId) {
    return res.status(400).json({ error: 'userId and dishId are required' });
  }

  try {
    // Find existing history entry
    let history = await History.findOne({
      user_id: userId,
      dish_id: dishId
    });
  
    if (history) {
      // Update existing entry
      history.viewed_at = new Date();
      await history.save();
    } else {
      // Create new entry
      history = new History({
        user_id: userId,
        dish_id: dishId,
        viewed_at: new Date()
      });
      await history.save();
    }
  
    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
