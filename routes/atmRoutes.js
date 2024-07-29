const express = require('express');
const router = express.Router();
const { createAtm, getAllAtms, getAtmById, updateAtm, deleteAtm } = require('../controllers/atmController');
const {authenticateToken, authorizeRolesAndPermissions} = require('../middleware/authMiddleware');

// CRUD operations
router.post('/create/atms', authenticateToken, createAtm);
router.get('/atms', authenticateToken, getAllAtms);
router.get('/atm/:id', authenticateToken, getAtmById);
router.put('/update/atms/:id', authenticateToken, updateAtm);
router.delete('/delete/atms/:id', authenticateToken, deleteAtm);

module.exports = router;
