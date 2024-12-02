const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
    phone: { type: String },
    avatar: { type: String }, // URL of the user avatar
    address: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('User', UserSchema);
