const express = require('express');
const Restaurant = require('../models/Restaurant');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware xác thực
const router = express.Router();

/**
 * @swagger
 * /restaurants/nearby:
 *   get:
 *     summary: Get nearby restaurants within a 2km radius
 *     description: Fetch a list of restaurants within a 2km radius based on user's location.
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         description: Latitude of the user's location
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         description: Longitude of the user's location
 *     responses:
 *       200:
 *         description: A list of nearby restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 */
router.get('/nearby', authenticateToken, async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], 2 / 3963], // Bán kính 2km
        },
      },
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Get restaurant details
 *     description: Get detailed information about a specific restaurant including its menu and images.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Detailed information about the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
  
    try {
      const restaurant = await Restaurant.findById(id).populate('menu');
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
