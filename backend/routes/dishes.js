const express = require('express');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware xác thực
const checkRole = require('../middleware/roleMiddleware'); // Middleware kiểm tra quyền
const router = express.Router();

/**
 * @swagger
 * /dishes/suggestions:
 *   get:
 *     summary: Get dish suggestions based on filters
 *     description: Get a list of dishes based on filters like price, preparation time, and location.
 *     parameters:
 *       - in: query
 *         name: prep_time
 *         schema:
 *           type: number
 *         description: Maximum preparation time in minutes
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         description: Latitude of user's location
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         description: Longitude of user's location
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         description: Search radius in miles from the location
 *     responses:
 *       200:
 *         description: A list of dish suggestions based on filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Internal server error
 */
router.get('/suggestions', async (req, res) => {
  const { prep_time, latitude, longitude, radius } = req.query;

  try {
    let restaurantFilter = {};
    let dishFilter = {};

    // ✅ 1. Lọc theo vị trí nếu latitude và longitude tồn tại
    if (latitude && longitude) {
      restaurantFilter.location = {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude), parseFloat(latitude)], 
            radius / 3963 // Bán kính radius (3963 mile = bán kính trái đất)
          ]
        }
      };

      // Tìm các nhà hàng phù hợp
      const restaurants = await Restaurant.find(restaurantFilter).select('_id');
      const restaurantIds = restaurants.map((r) => r._id);

      // Lọc món ăn từ các nhà hàng gần nhất
      dishFilter.restaurant_id = { $in: restaurantIds };
    }

    // ✅ 2. Lọc theo thời gian chuẩn bị (áp dụng cả khi có hoặc không có location)
    if (prep_time) {
      dishFilter.prep_time = { $lte: parseInt(prep_time) };
    }

    // ✅ 3. Tìm các món ăn theo bộ lọc
    const dishes = await Dish.find(dishFilter)
      .populate('restaurant_id')
      .lean();

    res.json(dishes);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /dishes/healthy:
 *   get:
 *     summary: Get healthy dishes based on calorie, protein, and diet type
 *     description: Get a list of healthy dishes based on filters like calories, protein, and diet type.
 *     parameters:
 *       - in: query
 *         name: maxCalories
 *         schema:
 *           type: number
 *         description: Maximum number of calories
 *       - in: query
 *         name: minProtein
 *         schema:
 *           type: number
 *         description: Minimum amount of protein
 *       - in: query
 *         name: dietType
 *         schema:
 *           type: string
 *           enum: [vegan, keto, vegetarian, other]
 *         description: Type of diet (e.g., vegan, keto, vegetarian)
 *     responses:
 *       200:
 *         description: A list of healthy dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Internal server error
 */
router.get('/healthy', async (req, res) => {
    // const { maxCalories, minProtein, dietType } = req.query;
    var maxCalories = 500;
    var minProtein = 20;
    var dietType = "no";
    try {
      const dishes = await Dish.find({
        calories: { $lte: maxCalories },
        protein: { $gte: minProtein },
        diet_type: dietType
      }).populate('restaurant_id');
  
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /dishes/{id}:
 *   get:
 *     summary: Get dish details
 *     description: Get detailed information about a specific dish including ingredients, price, and rating.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dish ID
 *     responses:
 *       200:
 *         description: Detailed information about the dish
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const dish = await Dish.findById(id).populate('restaurant_id');
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
  
      res.json(dish);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
