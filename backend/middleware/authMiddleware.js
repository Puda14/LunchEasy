const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Đặt trong .env thực tế

// Middleware để xác thực JWT
const authenticateToken = (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Gắn thông tin user vào req để sử dụng ở các handler khác
    next(); // Tiếp tục xử lý
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
