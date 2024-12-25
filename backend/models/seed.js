const mongoose = require('mongoose');
const Dish = require('./Dish'); // Đảm bảo đường dẫn tới file DishSchema chính xác
const Restaurant = require('./Restaurant'); // Đảm bảo đường dẫn tới file RestaurantSchema chính xác
const restaurants = [
    {
      name: 'Bun Bo Minh Beo',
      address: '110e3 P. Lê Thanh Nghị, Bách Khoa, Hai Bà Trưng, Hà Nội, Việt Nam',
      latitude: 21.0031998,
      longitude: 105.8468134,
      rating: 4.5,
      mapUrl: 'https://maps.app.goo.gl/VH7vwTXuzDWYAGtn8',
      images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693415/Screenshot_2024-12-20_170348_aelqtw.png'],
      menu: [], // Thêm ID các món ăn nếu đã tạo
    },
    {
      name: 'Pizza 4P\'s',
      address: '11B P. Báo Khánh, Alley, Hoàn Kiếm, Hà Nội, Việt Nam',
      latitude: 21.031269,
      longitude: 105.8425816,
      rating: 4.8,
      mapUrl: 'https://maps.app.goo.gl/3pnK2xFyFLbfj5oT8',
      images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693414/Screenshot_2024-12-20_172024_f5jcdd.png'],
      menu: [], // Thêm ID các món ăn nếu có
    },
    {
      name: 'Com Tam Sa Bi Chuong',
      address: '86 P. Nguyễn Văn Tuyết, Trung Liệt, Đống Đa, Hà Nội 700000, Việt Nam',
      latitude: 21.0092926,
      longitude: 105.8180597,
      rating: 4.2,
      mapUrl: 'https://maps.app.goo.gl/sfzYEyLH1qD7gUkb9',
      images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693408/Screenshot_2024-12-20_180358_phrd8t.png'],
      menu: [], // Thêm ID các món ăn nếu cần
    },
    {
        name: 'Com ga Kampong',
        address: '12 P.Phạm Ngọc Thạch, Kim Liên, Đống Đa, Hà Nội, Việt Nam',
        latitude: 21.0078095,
        longitude: 105.8143124,
        rating: 4.2,
        mapUrl: 'https://maps.app.goo.gl/o7HhwtxT69ds8bbw7',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693408/Screenshot_2024-12-20_174132_pszitr.png'],
        menu: [], // Thêm ID các món ăn nếu cần
    },
    {
        name: 'ISushi',
        address: '17T5 P. Hoàng Đạo Thúy, Trung Hòa Nhân Chính, Cầu Giấy, Hà Nội, Việt Nam',
        latitude: 21.0067339,
        longitude: 105.8009972,
        rating: 4.2,
        mapUrl: 'https://maps.app.goo.gl/8wThoU7VuBXN8KYe8',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693412/Screenshot_2024-12-20_173423_ejcrvl.png'],
        menu: [], // Thêm ID các món ăn nếu cần
      },
  ];

const dishes = [
    {
      name: 'Hu tieu bo vien',
      ingredients: ['Noodle', 'Beef', 'Pork', 'Onion', 'spring onion'],
      calories: 350,
      protein: 25,
      diet_type: 'no',
      prep_time: 15,
      price: 10.99,
      restaurant_id: '676596cbdcd20edd05b10749', // Thay bằng ObjectId hợp lệ
      images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693414/Screenshot_2024-12-20_171820_mp7gvo.png'],
      description: 'A delicious and healthy grilled chicken salad.',
    },
    {
      name: 'Hu tieu tron',
      ingredients: ['Noodle', 'Beef', 'Pork', 'Onion', 'spring onion'],
      calories: 400,
      protein: 12,
      diet_type: 'no',
      prep_time: 20,
      price: 12.99,
      restaurant_id: '676596cbdcd20edd05b10749',
      images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693415/Screenshot_2024-12-20_171717_xgxkrr.png'],
      description: 'A nutritious vegan bowl packed with flavors.',
    },
    {
      name: 'Bun bo Hue',
      ingredients: ['Noodle', 'Beef', 'Pork', 'Onion', 'spring onion'],
      calories: 650,
      protein: 30,
      diet_type: 'no',
      prep_time: 10,
      price: 8.99,
      restaurant_id: '676596cbdcd20edd05b10749',
      images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693414/Screenshot_2024-12-20_171754_xigiej.png'],
      description: 'A classic beef burger with a juicy patty.',
    },
    {
        name: 'Pizza 1',
        ingredients: [ 'Beef', 'Pork', 'Onion', 'Tomato', 'Cheese'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693413/Screenshot_2024-12-20_172151_sppvmt.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Pizza 2',
        ingredients: ['Beef', 'Pork', 'Onion', 'Tomato', 'Cheese'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693413/Screenshot_2024-12-20_172214_zhfq4t.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Pizza 3',
        ingredients: ['Beef', 'Pork', 'Onion', 'Tomato', 'Cheese'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693413/Screenshot_2024-12-20_172203_tbjkut.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Pizza 4',
        ingredients: ['Beef', 'Pork', 'Onion', 'Tomato','Seafood' ,'Cheese'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693413/Screenshot_2024-12-20_172226_tcbwwt.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Pizza 5',
        ingredients: ['Beef', 'Pork', 'Onion', 'Tomato', 'Cheese','rosemary'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693412/Screenshot_2024-12-20_172236_aztbga.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Pizza 6',
        ingredients: ['Beef', 'Pork','Bacon' ,'Onion', 'Tomato', 'Cheese','rosemary'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693412/Screenshot_2024-12-20_172248_keaq0r.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Salad 1',
        ingredients: ['Fish', 'Pork', 'Onion', 'Tomato', 'Cheese','watercress'],
        calories: 100,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693412/Screenshot_2024-12-20_172416_ycqu7j.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Salad 2',
        ingredients: ['coriander', 'Onion', 'Tomato', 'Cheese','watercress'],
        calories: 100,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074a',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693413/Screenshot_2024-12-20_172139_sptlhf.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com tam suon 1',
        ingredients: ['Pork', 'Rice','Sauce','Cucumber'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074b',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693407/Screenshot_2024-12-20_181000_ppwljj.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com tam suon 2',
        ingredients: ['Pork', 'Rice','Sauce','Egg','Cucumber'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074b',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693408/Screenshot_2024-12-20_181009_zrj5cc.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com tam suon 3',
        ingredients: ['Pork', 'Rice','Sauce','Egg','Pork rind','Cucumber'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 8.99,
        restaurant_id: '676596cbdcd20edd05b1074b',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693407/Screenshot_2024-12-20_180950_bwcxcw.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com ga 1',
        ingredients: ['Chicken','Rice','Sauce'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 15,
        restaurant_id: '676596cbdcd20edd05b1074c',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693409/Screenshot_2024-12-20_174312_dwasol.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com ga 2',
        ingredients: ['Chicken','Rice','Sauce','Egg'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 15,
        restaurant_id: '676596cbdcd20edd05b1074c',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693409/Screenshot_2024-12-20_174306_jahbkv.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com ga 3',
        ingredients: ['Chicken','Rice','Sauce','Basil'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 15,
        restaurant_id: '676596cbdcd20edd05b1074c',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693408/Screenshot_2024-12-20_174320_iycdrf.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com ga 4',
        ingredients: ['Chicken','Rice','Sauce','Chilly'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 15,
        restaurant_id: '676596cbdcd20edd05b1074c',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693409/Screenshot_2024-12-20_174234_p6tsay.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com ga 5',
        ingredients: ['Crab','Rice','Sauce','Chicken'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 10,
        price: 15,
        restaurant_id: '676596cbdcd20edd05b1074c',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693407/Screenshot_2024-12-20_174226_g5bg8i.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Sushi 1',
        ingredients: ['Salmon','Sauce','Wasabi'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173619_syvq7f.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Sushi 2',
        ingredients: ['Salmon','Sauce','Wasabi'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693411/Screenshot_2024-12-20_173605_loxr7b.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Sushi 3',
        ingredients: ['Tuna','Sauce','Wasabi'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693411/Screenshot_2024-12-20_173529_fjozl7.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Sushi 4',
        ingredients: ['scallops','Sauce','Wasabi'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693411/Screenshot_2024-12-20_173543_pcjibu.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Sushi 5',
        ingredients: ['Herring','Sauce','Wasabi'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173619_syvq7f.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Sushi 6',
        ingredients: ['Tuna','Sauce','Wasabi'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173610_hikxju.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Udon 1',
        ingredients: ['Udon','Beef','Egg','Onion','Mushroom'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173736_ku0980.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Soba 1',
        ingredients: ['Soba','Matcha','Sauce','Wasabi','Seaweed','Onion'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173745_lz67gt.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Com luon 1',
        ingredients: ['Eel','Rice','Sauce','Egg','Salmon Eggs'],
        calories: 650,
        protein: 30,
        diet_type: 'no',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173803_gxddhi.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
      {
        name: 'Mi chay',
        ingredients: ['Udon','Onion','Mushroom','Tofu','Cabbage'],
        calories: 650,
        protein: 30,
        diet_type: 'vegan',
        prep_time: 30,
        price: 18.99,
        restaurant_id: '676596cbdcd20edd05b1074d',
        images: ['https://res.cloudinary.com/dc9dg8afp/image/upload/v1734693410/Screenshot_2024-12-20_173753_seh4zr.png'],
        description: 'A classic beef burger with a juicy patty.',
      },
  ];

//mogodb connection
const MONGO_URI = 'mongodb://admin:admin123@localhost:27017/magi?authSource=admin' || process.env.MONGO_URI;
// MongoDB connection
const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        // Remove deprecated options
        serverSelectionTimeoutMS: 5000, // Adjust the timeout as necessary
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };



// Hàm thêm danh sách Dish
const addDishes = async () => {
    try {
      
  
      // Thêm danh sách vào MongoDB
      const savedDishes = await Dish.insertMany(dishes);
      console.log('Danh sách Dish được thêm thành công:', savedDishes);
    } catch (error) {
      console.error('Lỗi khi thêm danh sách Dish:', error);
    } finally {
      mongoose.connection.close(); // Đóng kết nối sau khi hoàn tất
    }
  };

  const addDishToRestaurant = async (dishData, restaurantId) => {
    try {
      const newDish = await Dish.create(dishData);
      await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $push: { menu: newDish._id } },
        { new: true, useFindAndModify: false }
      );
      console.log(`Dish ${newDish.name} added to restaurant ${restaurantId}`);
    } catch (error) {
      console.error('Error adding dish to restaurant:', error);
    }
  };
// Hàm thêm danh sách nhà hàng
const addRestaurants = async () => {
    try {
      // Thêm danh sách vào MongoDB
      const savedRestaurants = await Restaurant.insertMany(restaurants);
      console.log('Danh sách nhà hàng được thêm thành công:', savedRestaurants);
    } catch (error) {
      console.error('Lỗi khi thêm danh sách nhà hàng:', error);
    } finally {
      mongoose.connection.close(); // Đóng kết nối sau khi hoàn tất
    }
  };
// // Gọi hàm thêm dish
// connectDB();
// // addRestaurants();
// addDishes();
const updateRestaurantMenus = async () => {
  try {
    const dishes = await Dish.find();
    const restaurantDishMap = {};

    // Group dishes by restaurant_id
    dishes.forEach((dish) => {
      if (!restaurantDishMap[dish.restaurant_id]) {
        restaurantDishMap[dish.restaurant_id] = [];
      }
      restaurantDishMap[dish.restaurant_id].push(dish._id);
    });

    // Update each restaurant's menu with the corresponding dish IDs
    const updatePromises = Object.keys(restaurantDishMap).map((restaurantId) =>
      Restaurant.findByIdAndUpdate(
        restaurantId,
        { $push: { menu: { $each: restaurantDishMap[restaurantId] } } },
        { new: true, useFindAndModify: false }
      )
    );

    await Promise.all(updatePromises);
    console.log('Restaurant menus updated successfully');
  } catch (error) {
    console.error('Error updating restaurant menus:', error);
  } finally {
    mongoose.connection.close(); // Close connection after completion
  }
};

// Connect to the database and update restaurant menus
connectDB().then(updateRestaurantMenus);