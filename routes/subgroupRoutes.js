const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createSubgroup,
  getAllSubgroups,
  getSubgroupById,
  updateSubgroup,
  deleteSubgroup
} = require('../controllers/subgroupController'); // Adjust the path as necessary

router.post('/create/subgroup', authenticateToken, createSubgroup);
router.get('/subgroup', authenticateToken, getAllSubgroups);
router.get('/subgroup/:id', authenticateToken, getSubgroupById);
router.put('/update/subgroup/:id', authenticateToken, updateSubgroup);
router.delete('/delete/subgroup/:id', authenticateToken, deleteSubgroup);

module.exports = router;
