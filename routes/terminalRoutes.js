const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const {
  createTerminal,
  getAllTerminals,
  getTerminalById,
  updateTerminal,
  deleteTerminal
} = require('../controllers/terminalController'); // Adjust the path as necessary

router.post('/create/terminal', authenticateToken, createTerminal);
router.get('/terminal', authenticateToken, getAllTerminals);
router.get('/terminal/:id', authenticateToken, getTerminalById);
router.put('/update/terminal/:id', authenticateToken, updateTerminal);
router.delete('/delete/terminal/:id', authenticateToken, deleteTerminal);

module.exports = router;
