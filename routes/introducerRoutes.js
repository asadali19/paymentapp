const express = require('express');
const router = express.Router();
const {
  createIntroducer,
  getAllIntroducers,
  getIntroducerById,
  updateIntroducer,
  deleteIntroducer
} = require('../controllers/introducerController'); // Adjust the path as necessary
const {authenticateToken} = require("../middleware/authMiddleware")


router.post('/create/introducers', authenticateToken, createIntroducer);
router.get('/introducers', authenticateToken, getAllIntroducers);
router.get('/introducer/:id', authenticateToken, getIntroducerById);
router.put('/update/introducers/:id', authenticateToken,  updateIntroducer);
router.delete('/delete/introducers/:id', authenticateToken, deleteIntroducer);

module.exports = router;
