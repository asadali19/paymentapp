const express = require('express')
const router = express.Router()
const {storeTransaction} = require('../controllers/transactionController')

router.post('/storeTransaction',storeTransaction),


module.exports= router