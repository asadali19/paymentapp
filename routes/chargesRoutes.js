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
router.get('/charges', authenticateToken, getAllCharges);
router.get('/soc', authenticateToken, getAllSoc);
router.get('/charge/:id', authenticateToken, getChargeById);
router.put('/update/charges/:id', authenticateToken, updateCharge);
router.delete('/delete/charges/:id', authenticateToken, deleteCharge);

module.exports = router;
