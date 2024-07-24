const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} = require('../controllers/roleController');

router.post('/create/roles', authenticateToken, createRole);
router.get('/roles', authenticateToken, getAllRoles);
router.get('/roles/:id', authenticateToken, getRoleById); 
router.put('/update/roles/:id', authenticateToken, updateRole); 
router.delete('/delete/roles/:id', authenticateToken, deleteRole);

module.exports = router;
