const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    images: { type: [String] }, // Array of image URLs
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }], // Array of dish references
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
