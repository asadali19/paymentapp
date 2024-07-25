const Charges = require('../models/charges'); 
const Terminals = require('../models/terminal'); 
const ActivityLog = require('../models/activity');
// Create a new charge
const createCharge = async (req, res) => {
  try {
    const {
      name = null,
      rangeamount = null,
      percentage = null,
      fixedamount = null,
      terminal_id = null,
      status = null
    } = req.body;

    const newCharge = await Charges.create({
      name,
      rangeamount,
      percentage,
      fixedamount,
      terminal_id,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new charges  ${newCharge.name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newCharge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all charges
const getAllCharges = async (req, res) => {
  try {
    const charges = await Charges.findAll({
      include: [{
        model: Terminals,
        attributes: ['terminal_sn'], 
        required: true 
      }]
    });

    const chargesWithTerminal = charges.map(charge => {
      const { Terminal, ...chargeData } = charge.dataValues;
      return {
        ...chargeData,
      };
    });

    res.status(200).json(chargesWithTerminal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getChargeById = async (req, res) => {
  try {
    const { id } = req.params; // Get the charge ID from request parameters

    // Find the charge by ID, including the associated Merchant's name
    const charge = await Charges.findByPk(id, {
      include: [{
        model: Terminals,
        attributes: ['terminal_sn'], // Include only the 'name' attribute from Merchant
        required: true // Ensure only charges with an associated merchant are returned
      }]
    });
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the charges  ${charge.name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    if (!charge) {
      return res.status(404).json({ error: 'Charge not found' });
    }

    // Destructure charge data and include merchant_name
    const { Merchant, ...chargeData } = charge.toJSON();
    const chargeWithMerchantName = {
      ...chargeData,
    };

    res.status(200).json(chargeWithMerchantName); // Send the charge with merchant name
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};


// Update a charge by ID
const updateCharge = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name = null,
      rangeamount = null,
      percentage = null,
      fixedamount = null,
      terminal_id = null,
      status = null
    } = req.body;

    const updatedFields = {
      name,
      rangeamount,
      percentage,
      fixedamount,
      terminal_id,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Charges.update(updatedFields, {
      where: { charges_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Charge not found' });
    }

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the channel  ${updated.name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    const updatedCharge = await Charges.findByPk(id);
    res.status(200).json(updatedCharge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a charge by ID
const deleteCharge = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Charges.destroy({
      where: { charges_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Charge not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCharge,
  getAllCharges,
  getChargeById,
  updateCharge,
  deleteCharge
};
