const checkRole = (requiredRole) => {
    return (req, res, next) => {
      // Kiểm tra thông tin user đã được gắn vào req từ middleware xác thực
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      // Kiểm tra vai trò
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }
  
      // Nếu quyền hạn hợp lệ
      next();
    };
  };
  
  module.exports = checkRole;
  