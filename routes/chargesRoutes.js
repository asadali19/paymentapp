const express = require('express');
const {authenticateToken, authorizeRolesAndPermissions} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createCharge,
  getAllCharges,
  getChargeById,
  updateCharge,
  deleteCharge
} = require('../controllers/chargesController'); 

router.post('/create/charges', authenticateToken, createCharge);
router.get('/charges', authenticateToken, authorizeRolesAndPermissions, getAllCharges);
router.get('/charge/:id', authenticateToken, authorizeRolesAndPermissions, getChargeById);
router.put('/update/charges/:id', authenticateToken,authorizeRolesAndPermissions, updateCharge);
router.delete('/delete/charges/:id', authenticateToken, deleteCharge);

module.exports = router;
