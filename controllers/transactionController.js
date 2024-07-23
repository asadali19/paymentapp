const Transaction = require("../models/transaction");
const Merchant = require("../models/merchant")
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

    console.log(merchant);

    const newTransaction = await Transaction.create({
      amount,
      reference_no,
      trans_status,
      trans_type,
      card_no,
      terminal_id,
      merchant_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
   storeTransaction
  };