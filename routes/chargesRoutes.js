const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createCharge,
  getAllCharges,
  getChargeById,
  updateCharge,
  deleteCharge
} = require('../controllers/chargesController'); 

router.post('/create/charges', authenticateToken, createCharge);
router.get('/charges', authenticateToken, getAllCharges);
router.get('/charges/:id', authenticateToken, getChargeById);
router.put('/update/charges/:id', authenticateToken, updateCharge);
router.delete('/delete/charges/:id', authenticateToken, deleteCharge);

module.exports = router;
