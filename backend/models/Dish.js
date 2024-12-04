const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: [String], required: true }, // List of ingredients
    calories: { type: Number, required: true }, // Calories count
    protein: { type: Number, required: true }, // Protein amount
    diet_type: { type: String, enum: ['vegan', 'keto', 'vegetarian', 'other','no'] },
    prep_time: { type: Number, required: true }, // Preparation time in minutes
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Dish belongs to a restaurant
    images: { type: [String] }, // Array of image URLs
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dish', DishSchema);
