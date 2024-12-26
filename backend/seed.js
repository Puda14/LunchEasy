const mongoose = require('mongoose');
const fs = require('fs');
const Dish = require('./models/Dish');
const Restaurant = require('./models/Restaurant');

// Kết nối tới MongoDB
mongoose
  .connect('mongodb://admin:admin123@mongodb:27017/magi?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Đọc file JSON
const dishesData = JSON.parse(fs.readFileSync('./magi.dishes.json', 'utf8'));
const restaurantsData = JSON.parse(fs.readFileSync('./magi.restaurants.json', 'utf8'));

// Hàm chuyển đổi các trường đặc biệt
const normalizeData = (data, isRestaurant = false) => {
  return data.map((item) => {
    if (item._id && item._id.$oid) {
      item._id = new mongoose.Types.ObjectId(item._id.$oid); // Chuyển đổi ObjectId
    }
    if (item.restaurant_id && item.restaurant_id.$oid) {
      item.restaurant_id = new mongoose.Types.ObjectId(item.restaurant_id.$oid); // Chuyển đổi ObjectId tham chiếu
    }
    if (item.createdAt && item.createdAt.$date) {
      item.createdAt = new Date(item.createdAt.$date); // Chuyển đổi ngày
    }
    if (item.updatedAt && item.updatedAt.$date) {
      item.updatedAt = new Date(item.updatedAt.$date); // Chuyển đổi ngày
    }
    if (isRestaurant && item.menu) {
      item.menu = item.menu.map((menuItem) => {
        if (menuItem.$oid) {
          return new mongoose.Types.ObjectId(menuItem.$oid); // Chuyển đổi từng menu item thành ObjectId
        }
        return menuItem;
      });
    }
    return item;
  });
};

const seedData = async () => {
  try {
    // Chuẩn hóa dữ liệu
    const normalizedRestaurants = normalizeData(restaurantsData, true); // Truyền tham số isRestaurant = true
    const normalizedDishes = normalizeData(dishesData);

    // Seed dữ liệu Restaurants trước (vì Dish phụ thuộc vào Restaurant)
    await Restaurant.insertMany(normalizedRestaurants);
    console.log('Restaurants seeded successfully');

    // Seed dữ liệu Dishes
    await Dish.insertMany(normalizedDishes);
    console.log('Dishes seeded successfully');

    process.exit(0); // Kết thúc process
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); // Thoát với lỗi
  }
};


seedData();
