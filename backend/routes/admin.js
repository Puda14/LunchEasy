const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');
const authenticateToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * /admin/dishes:
 *   get:
 *     summary: Get a list of all dishes
 *     description: Admin can get a list of all dishes in the system.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Internal server error
 */
router.get('/dishes', authenticateToken, checkRole('Admin'), async (req, res) => {
    try {
      const dishes = await Dish.find().populate('restaurant_id');
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /admin/dishes/{id}:
 *   get:
 *     summary: Get dish details
 *     description: Admin can view details of a specific dish by ID.
*      security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the dish to retrieve
 *     responses:
 *       200:
 *         description: Dish details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.get('/dishes/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
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
  
/**
 * @swagger
 * /admin/dishes:
 *   post:
 *     summary: Add a new dish
 *     description: Admin can add a new dish to the menu.
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       201:
 *         description: Dish added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/dishes', authenticateToken, checkRole('Admin'), async (req, res) => {
  const { name, ingredients, calories, protein, prep_time, price,images, restaurant_id } = req.body;

  try {
    const newDish = new Dish({
      name,
      ingredients,
      calories,
      protein,
      prep_time,
      price,
      images,
      restaurant_id
    });
    
    await newDish.save();
    // Cập nhật menu của nhà hàng
    await Restaurant.findByIdAndUpdate(
    restaurant_id,
    { $push: { menu: newDish._id } }, // Thêm Dish ID vào menu
    { new: true, useFindAndModify: false }
  );
    res.status(201).json({ message: 'Dish added successfully', dish: newDish });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admin/dishes/{id}:
 *   put:
 *     summary: Update an existing dish
 *     description: Admin can update an existing dish's details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the dish to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/dishes/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, calories, protein, prep_time, price, restaurant_id } = req.body;

  try {
    const dish = await Dish.findByIdAndUpdate(id, {
      name,
      ingredients,
      calories,
      protein,
      prep_time,
      price,
      restaurant_id
    }, { new: true });

    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json({ message: 'Dish updated successfully', dish });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admin/dishes/{id}:
 *   delete:
 *     summary: Delete a dish
 *     description: Admin can delete a dish.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the dish to delete
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.delete('/dishes/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admin/restaurants:
 *   get:
 *     summary: Get a list of all restaurants
 *     description: Admin can get a list of all restaurants in the system.
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Internal server error
 */
router.get('/restaurants', authenticateToken, checkRole('Admin'), async (req, res) => {
    try {
      const restaurants = await Restaurant.find().populate('menu');
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /admin/restaurants/{id}:
 *   get:
 *     summary: Get restaurant details
 *     description: Admin can view details of a specific restaurant by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to retrieve
 *     responses:
 *       200:
 *         description: Restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
router.get('/restaurants/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
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
  
/**
 * @swagger
 * /admin/restaurants:
 *   post:
 *     summary: Add a new restaurant
 *     description: Admin can add a new restaurant.
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/restaurants', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { name, address, latitude, longitude, rating, mapUrl,images, menu } = req.body;
  
    try {
      const newRestaurant = new Restaurant({
        name,
        address,
        latitude,
        longitude,
        rating,
        mapUrl,
        images,
        menu
      });
  
      await newRestaurant.save();
      res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /admin/restaurants/{id}:
   *   put:
   *     summary: Update an existing restaurant
   *     description: Admin can update an existing restaurant's details.
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the restaurant to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Restaurant'
   *     responses:
   *       200:
   *         description: Restaurant updated successfully
   *       500:
   *         description: Internal server error
   */
router.put('/restaurants/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { id } = req.params;
    const { name, address, latitude, longitude, rating, menu } = req.body;
  
    try {
      const restaurant = await Restaurant.findByIdAndUpdate(id, {
        name,
        address,
        latitude,
        longitude,
        rating,
        menu
      }, { new: true });
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.status(200).json({ message: 'Restaurant updated successfully', restaurant });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /admin/restaurants/{id}:
   *   delete:
   *     summary: Delete a restaurant
   *     description: Admin can delete a restaurant.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the restaurant to delete
   *     responses:
   *       200:
   *         description: Restaurant deleted successfully
   *       404:
   *         description: Restaurant not found
   *       500:
   *         description: Internal server error
   */
router.delete('/restaurants/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { id } = req.params;
  
    try {
      const restaurant = await Restaurant.findByIdAndDelete(id);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get a list of all users
 *     description: Admin can get a list of all users in the system.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/users', authenticateToken, checkRole('Admin'), async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user details
 *     description: Admin can view details of a specific user by ID.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/users/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Add a new user
 *     description: Admin can add a new user.
 *     security:
 *      - bearerAuth: []
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [User, Admin]
 *     responses:
 *       201:
 *         description: User added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/users', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /admin/users/{id}:
   *   put:
   *     summary: Update user information
   *     description: Admin can update a user's details.
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user to update
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
   *               role:
   *                 type: string
   *                 enum: [User, Admin]
   *     responses:
   *       200:
   *         description: User updated successfully
   *       500:
   *         description: Internal server error
   */
  router.put('/users/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /admin/users/{id}:
   *   delete:
   *     summary: Delete a user
   *     description: Admin can delete a user.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user to delete
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  router.delete('/users/:id', authenticateToken, checkRole('Admin'), async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
