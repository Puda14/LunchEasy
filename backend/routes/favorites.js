const express = require('express');
const Favorite = require('../models/Favorite');
const Dish = require('../models/Dish');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware xác thực
const router = express.Router();

/**
 * @swagger
 * /favorites/add:
 *   post:
 *     summary: Add a dish to the user's favorites
 *     description: Add a dish to the favorite list of the logged-in user.
 *     tags: [Favorites]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               dishId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dish added to favorites
 *       400:
 *         description: Dish already in favorites
 *       500:
 *         description: Internal server error
 */
router.post('/add', authenticateToken, async (req, res) => {
  const { userId, dishId } = req.body;

  try {
    const existingFavorite = await Favorite.findOne({ user_id: userId, dish_id: dishId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Món ăn này đã có trong danh sách yêu thích.' });
    }

    const favorite = new Favorite({ user_id: userId, dish_id: dishId });
    await favorite.save();

    res.status(200).json({ message: 'Đã thêm vào danh sách yêu thích.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get a list of the user's favorite dishes
 *     description: Fetch the list of dishes that the user has added to their favorites.
 *     tags: [Favorites] 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: A list of favorite dishes
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
    const favorites = await Favorite.find({ user_id: userId })
    .populate({
      path: 'dish_id',
      populate: {
        path: 'restaurant_id',
      }
    })
    .lean(); 
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /favorites/remove:
 *   delete:
 *     summary: Remove a dish from user's favorites
 *     description: Remove a dish from the favorite list of the logged-in user
 *     tags: [Favorites]
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
 *               dishId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dish removed from favorites successfully
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Internal server error
 */
router.delete('/remove', authenticateToken, async (req, res) => {
  const { userId, dishId } = req.body;

  if (!userId || !dishId) {
    return res.status(400).json({ error: 'userId and dishId are required' });
  }

  try {
    const result = await Favorite.findOneAndDelete({
      user_id: userId,
      dish_id: dishId
    });

    if (!result) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
