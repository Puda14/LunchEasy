const express = require('express');
const router = express.Router();
const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Middleware để xử lý upload file
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route để upload file lên Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: 'restaurant_images',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Error:', error);
          return res.status(500).json({ error: 'Upload failed' });
        }
        res.json({ imageUrl: result.secure_url });
      }
    ).end(file.buffer);
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
