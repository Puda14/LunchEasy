const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//mogodb connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
