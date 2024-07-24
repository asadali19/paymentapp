const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
} = require('../controllers/citiesController'); // Adjust the path as necessary

const router = express.Router();

router.post('/create/city', authenticateToken, createCity);
router.get('/city', authenticateToken, getAllCities);
router.get('/city/:id', authenticateToken, getCityById);
router.put('/update/city/:id', authenticateToken, updateCity);
router.delete('/delete/city/:id', authenticateToken, deleteCity);

module.exports = router;
