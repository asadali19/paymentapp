const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup
} = require('../controllers/groupController'); 

router.post('/create/group', authenticateToken, createGroup);
router.get('/groups', authenticateToken, getAllGroups);
router.get('/group/:id', authenticateToken, getGroupById);
router.put('/update/group/:id', authenticateToken, updateGroup);
router.delete('/delete/group/:id', authenticateToken, deleteGroup);

module.exports = router;
