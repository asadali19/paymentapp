// routes/transactionRoute.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/transactions', transactionController.processTransaction);

module.exports = router;
