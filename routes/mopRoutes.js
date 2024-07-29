const express = require('express');
const router = express.Router();
const {
  createMop,
  getAllMops,
  getMopById,
  updateMop,
  deleteMop
} = require('../controllers/mopController'); 
const {authenticateToken} = require("../middleware/authMiddleware")

router.post('/create/mops', authenticateToken, createMop);
router.get('/mops', authenticateToken, getAllMops);
router.get('/mop/:id', authenticateToken, getMopById);
router.put('/update/mops/:id', authenticateToken, updateMop);
router.delete('/delete/mops/:id', authenticateToken, deleteMop);

module.exports = router;
