const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const {authenticateToken, authorizeRolesAndPermissions} = require('../middleware/authMiddleware');

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User CRUD routes with authentication
router.get('/users', authenticateToken, authorizeRolesAndPermissions, getAllUsers);
router.get('/user/:id', authenticateToken, getUserById);
router.put('/update/users/:id', authenticateToken, updateUser);
router.delete('/delete/users/:id', authenticateToken, deleteUser);

module.exports = router;
 