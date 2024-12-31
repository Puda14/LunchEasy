const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import file cấu hình Swagger
const authRoutes = require('./routes/auth'); // Đường dẫn tới file auth.js
const profileRoutes = require('./routes/profile'); // Đường dẫn tới file profile.js
const dishRoutes = require('./routes/dishes'); // Đường dẫn tới file dish.js
const restaurantRoutes = require('./routes/restaurants'); // Đường dẫn tới file restaurant.js
const favoriteRoutes = require('./routes/favorites'); // Đường dẫn tới file favorite.js
const historyRoutes = require('./routes/history'); // Đường dẫn tới file history.js
const adminRoutes = require('./routes/admin'); // Đường dẫn tới file admin.js
const uploadRoutes = require('./routes/upload'); // Đường dẫn tới file upload.js

const app = express();
// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

//mogodb connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});



// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/api/v1/example', (req, res) => {
  res.send('Hello World');
});
// Tích hợp route Auth
app.use('/auth', authRoutes);
// Tích hợp route Profile
app.use('/user', profileRoutes);
// Tích hợp route Dish
app.use('/dishes', dishRoutes);
// Tích hợp route Restaurant
app.use('/restaurants', restaurantRoutes);
// Tích hợp route Favorite
app.use('/favorites', favoriteRoutes);
// Tích hợp route History
app.use('/history', historyRoutes);
// Tích hợp route Admin
app.use('/admin', adminRoutes);
// Tích hợp route Upload
app.use('/upload', uploadRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});
