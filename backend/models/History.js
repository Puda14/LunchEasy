const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dish_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    viewed_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('History', HistorySchema);
