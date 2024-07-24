// merchantRoutes.js
const express = require('express');
const {authenticateToken} = require("../middleware/authMiddleware")
const { createMerchant, getAllMerchants, getMerchantById, updateMerchant, deleteMerchant} = require('../controllers/merchantController'); 

const router = express.Router();

router.post('/create/merchants', authenticateToken, createMerchant);
router.get('/merchants', authenticateToken, getAllMerchants);
router.get('/merchants/:id', authenticateToken, getMerchantById);
router.put('/update/merchants/:id', authenticateToken, updateMerchant);
router.delete('/delete/merchants/:id', authenticateToken, deleteMerchant);

module.exports = router;
