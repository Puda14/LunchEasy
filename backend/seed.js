const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const Dish = require('./models/Dish');
const Restaurant = require('./models/Restaurant');
const User = require('./models/User');

mongoose
  .connect('mongodb://admin:admin123@mongodb:27017/magi?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const dishesData = JSON.parse(fs.readFileSync('./magi.dishes.json', 'utf8'));
const restaurantsData = JSON.parse(fs.readFileSync('./magi.restaurants.json', 'utf8'));

const users = [
  {
    username: 'a',
    email: 'a@gmail.com',
    password: '12345678',
    role: 'User',
    phone: '0123456789',
    avatar: 'https://example.com/avatar_a.png',
    address: '123 Street, Hanoi, Vietnam',
    dob: new Date('1990-01-01'),
  },
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: '12345678',
    role: 'Admin',
    phone: '0987654321',
    avatar: 'https://example.com/avatar_admin.png',
    address: '456 Avenue, Hanoi, Vietnam',
    dob: new Date('1985-01-01'),
  },
];

const normalizeData = (data, isRestaurant = false) => {
  return data.map((item) => {
    if (item._id?.$oid) {
      item._id = new mongoose.Types.ObjectId(item._id.$oid);
    }
    if (item.restaurant_id?.$oid) {
      item.restaurant_id = new mongoose.Types.ObjectId(item.restaurant_id.$oid);
    }
    if (item.createdAt?.$date) {
      item.createdAt = new Date(item.createdAt.$date);
    }
    if (item.updatedAt?.$date) {
      item.updatedAt = new Date(item.updatedAt.$date);
    }
    if (isRestaurant && item.menu) {
      item.menu = item.menu.map((menuItem) => {
        if (menuItem.$oid) {
          return new mongoose.Types.ObjectId(menuItem.$oid);
        }
        return menuItem;
      });
    }
    return item;
  });
};

const clearDatabase = async () => {
  await User.deleteMany({});
  await Restaurant.deleteMany({});
  await Dish.deleteMany({});
  console.log('Database cleared successfully');
};

const seedData = async () => {
  const normalizedRestaurants = normalizeData(restaurantsData, true);
  const normalizedDishes = normalizeData(dishesData);

  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    })
  );

  await User.insertMany(hashedUsers);
  console.log('Users seeded successfully');

  await Restaurant.insertMany(normalizedRestaurants);
  console.log('Restaurants seeded successfully');

  await Dish.insertMany(normalizedDishes);
  console.log('Dishes seeded successfully');
};

(async () => {
  try {
    console.log('Clearing database...');
    await clearDatabase();
    console.log('Seeding data...');
    await seedData();
    process.exit(0);
  } catch (error) {
    console.error('Error during the seeding process:', error);
    process.exit(1);
  }
})();
