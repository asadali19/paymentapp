const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/role');
const Permission = require('../models/Permission');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

async function authorizeRolesAndPermissions(req, res, next) {
  try {

   const user = await User.findByPk(req.user.userId, {
  include: [{
    model: Role, 
    as: 'role' 
  }]
  })
    if (!user) {
      return res.status(403).json({ message: 'Access denied. User not found.' });
  }
  const role = user.role;
  if (!role) {
      return res.status(403).json({ message: 'Access denied. User does not have a role assigned.' });
  } 
  const requestedRoute = req.originalUrl;
  const cleanRoute = requestedRoute.replace(/\/\d+$/, '');
  // console.log("Clean Route:", cleanRoute);
  
  // Query your database to find the corresponding permission name for the requested route
  const permission = await Permission.findOne({ where: { permission_name: cleanRoute } });


  if (!role.permissions.includes(permission.permission_id)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }

  next();

  } catch (error) {
    res.status(500).json({ message: error.message });
}

}

module.exports = { 
   authorizeRolesAndPermissions, authenticateToken };
