const express = require('express');
const {authenticateToken, authorizeRolesAndPermissions} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createCharge,
  getAllCharges,
  getChargeById,
  updateCharge,
  deleteCharge,
  createNewSlab,
  getAllSoc
} = require('../controllers/chargesController'); 

router.post('/create/charges', authenticateToken, createCharge);
router.post('/create/slab', authenticateToken, createNewSlab);
router.get('/charges', authenticateToken, authorizeRolesAndPermissions, getAllCharges);
router.get('/soc', authenticateToken, authorizeRolesAndPermissions, getAllSoc);
router.get('/charge/:id', authenticateToken, authorizeRolesAndPermissions, getChargeById);
router.put('/update/charges/:id', authenticateToken,authorizeRolesAndPermissions, updateCharge);
router.delete('/delete/charges/:id', authenticateToken, deleteCharge);

module.exports = router;
