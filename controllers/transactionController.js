// const Transaction = require("../models/transaction");
// const Merchant = require("../models/merchant")
// const ActivityLog = require('../models/activity');

// const storeTransaction = async (req, res) => {
//   try {
//     const {
//       amount = null,
//       reference_no = null,
//       trans_status = null,
//       trans_type = null,
//       card_no = null,
//       terminal_id = null,
//       merchant_id = null,
//     } = req.body;

//     const merchant = await Merchant.findOne({ merchant_id });

//     console.log(merchant);

//     const newTransaction = await Transaction.create({
//       amount,
//       reference_no,
//       trans_status,
//       trans_type,
//       card_no,
//       terminal_id,
//       merchant_id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     res.status(201).json(newTransaction);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = {
//    storeTransaction
//   };





const Transaction = require("../models/transaction");
const Merchant = require("../models/merchant");
const crypto = require('crypto');
const iso8583 = require('iso_8583'); // hypothetical ISO 8583 library

const algorithm = 'aes-256-cbc'; 
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function createIsoMessage(transaction) {
    return {
        0: '0200', // Message Type Indicator
        2: transaction.card_no, // Primary Account Number (PAN)
        3: transaction.trans_type, // Processing Code
        4: transaction.amount, // Transaction Amount
        7: new Date().toISOString(), // Transmission Date and Time
        11: transaction.reference_no, // System Trace Audit Number
        41: transaction.terminal_id, // Terminal ID
        42: transaction.merchant_id, // Merchant ID
        39: transaction.trans_status // Response Code
    };
}

function messageToBuffer(message) {
    const isoMessage = new iso8583(message);
    return isoMessage.getBufferMessage();
}

function bufferToHex(buffer) {
    return buffer.toString('hex');
}

function hexToUtf8(hex) {
    const buffer = Buffer.from(hex, 'hex');
    return buffer.toString('utf8');
}

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const storeTransaction = async (req, res) => {
  try {
    const {
      amount = null,
      reference_no = null,
      trans_status = null,
      trans_type = null,
      card_no = null,
      terminal_id = null,
      merchant_id = null,
    } = req.body;

    const merchant = await Merchant.findOne({ merchant_id });

    if (!merchant) {
      return res.status(404).json({ error: 'Merchant not found' });
    }

    const newTransaction = {
      amount,
      reference_no,
      trans_status,
      trans_type,
      card_no,
      terminal_id,
      merchant_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create ISO 8583 message
    const isoMessage = createIsoMessage(newTransaction);
    const buffer = messageToBuffer(isoMessage);
    const hexString = bufferToHex(buffer);
    const utf8String = hexToUtf8(hexString);

    // Encrypt the utf8String
    const encryptedData = encrypt(utf8String);

    // Verification Step
    const decryptedData = decrypt(encryptedData);
    if (utf8String !== decryptedData) {
        return res.status(500).json({ error: 'Decryption verification failed' });
    }

    // Store transaction in the database
    const createdTransaction = await Transaction.create(newTransaction);

    res.status(201).json({ transaction: createdTransaction, iso8583: encryptedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  storeTransaction
};
