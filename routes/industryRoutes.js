const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const {
  createIndustry,
  getAllIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry
} = require('../controllers/industryController'); 

const router = express.Router();

router.post('/create/industry', authenticateToken, createIndustry);
router.get('/industrys', authenticateToken, getAllIndustries);
router.get('/industry/:id', authenticateToken, getIndustryById);
router.put('/update/industry/:id', authenticateToken, updateIndustry);
router.delete('/delete/industry/:id', authenticateToken, deleteIndustry);

module.exports = router;
