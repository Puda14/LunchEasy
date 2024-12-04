const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dish_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    added_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Favorite', FavoriteSchema);
