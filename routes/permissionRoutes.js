const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
} = require('../controllers/permissionController'); // Adjust the path as necessary

router.post('/create/permissions', authenticateToken, createPermission);
router.get('/permissionss', authenticateToken, getAllPermissions);
router.get('/permissions/:id', authenticateToken, getPermissionById); // Corrected endpoint with :id
router.put('/update/permissions/:id', authenticateToken, updatePermission); // Corrected endpoint with :id
router.delete('/delete/permissions/:id', authenticateToken, deletePermission); // Corrected endpoint with :id

module.exports = router;
