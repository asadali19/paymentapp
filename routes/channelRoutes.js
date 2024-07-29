const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const {
  createChannel,
  getChannelById,
  updateChannel,
  deleteChannel,
  getAllChannel
} = require('../controllers/channelController'); // Adjust the path as necessary

const router = express.Router();

router.post('/create/channel', authenticateToken, createChannel);
router.get('/channels', authenticateToken, getAllChannel);
router.get('/channel/:id', authenticateToken, getChannelById);
router.put('/update/channel/:id', authenticateToken, updateChannel);
router.delete('/delete/channel/:id', authenticateToken, deleteChannel);

module.exports = router;
