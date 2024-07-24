const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
  getCityById
} = require('../controllers/regionController');

router.post('/create/region', authenticateToken, createRegion);
router.get('/regions', authenticateToken, getAllRegions);
router.get('/regionalcity/:region_id', authenticateToken, getCityById);
router.get('/region/:id', authenticateToken, getRegionById);
router.put('/update/region/:id', authenticateToken, updateRegion);
router.delete('/delete/region/:id', authenticateToken, deleteRegion);

module.exports = router;
