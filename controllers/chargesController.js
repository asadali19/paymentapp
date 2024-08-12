const Charges = require('../models/charges'); 
const SocName = require('../models/soc_name'); 
const Terminals = require('../models/terminal'); 
const ActivityLog = require('../models/activity');

// Create a new charge
const createCharge = async (req, res) => {
  try {
    const {
      soc_name,
      rangeamount = null,
      percentage = null,
      fixedamount = null,
      status = null
    } = req.body;

    // Save soc_name in soc_name table
    const newSocName = await SocName.create({
      name: soc_name,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Get the ID of the newly created soc_name
    const soc_id = newSocName.id;

    // Save the charge details in the charges table
    const newCharge = await Charges.create({
      soc_id,
      rangeamount,
      percentage,
      fixedamount,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity: `User ${user.id} created new charges for soc_id ${newCharge.soc_id}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newCharge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Grt all SOC

const getAllSoc = async (req, res) => {
  try {
    const soc = await SocName.findAll();
    res.status(200).json({ message: 'soc retrieved successfully', data: soc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Get all charges
const getAllCharges = async (req, res) => {
  try {
    const charges = await Charges.findAll({
      include: [{
        model: SocName,
        attributes: ['name'], 
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

    // Find the charge by ID, including the associated Merchant's soc_id
    const charge = await Charges.findByPk(id, {
      include: [{
        model: SocName,
        attributes: ['name'], 
        required: true 
      }]
    });

   
    if (!charge) {
      return res.status(404).json({ error: 'Charge not found' });
    }

    // Destructure charge data and include merchant_soc_id
    const { Merchant, ...chargeData } = charge.toJSON();
    const chargeWithMerchantsoc_id = {
      ...chargeData,
    };

    const { user } = req;
    await ActivityLog.create({
      activity_soc_id: `User ${user.usersoc_id} viewed the charges  ${charge.soc_id}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json(chargeWithMerchantsoc_id); // Send the charge with merchant soc_id
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};


// Update a charge by ID
const updateCharge = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      soc_id = null,
      rangeamount = null,
      percentage = null,
      fixedamount = null,
      status = null
    } = req.body;

    const updatedFields = {
      soc_id,
      rangeamount,
      percentage,
      fixedamount,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Charges.update(updatedFields, {
      where: { charges_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Charge not found' });
    }
    
    const updatedCharge = await Charges.findByPk(id);

    const { user } = req;
    await ActivityLog.create({
      activity_soc_id: `User ${user.usersoc_id} has updated the channel  ${updatedchannel.channel_soc_id}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

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
    const charge = await Charges.findOne({ where: { charges_id: id } }); 
    
    const { user } = req;
    await ActivityLog.create({
      activity_soc_id: `User ${user.usersoc_id} has deleted the charge ${charge.soc_id}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new slab for an existing SOC
const createNewSlab = async (req, res) => {
  try {
    const {
      soc_id,
      rangeamount = null,
      percentage = null,
      fixedamount = null,
      status = null
    } = req.body;

    // Save the new slab (charge) in the charges table against the existing soc_id
    const newSlab = await Charges.create({
      soc_id,
      rangeamount,
      percentage,
      fixedamount,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity: `User ${user.id} added a new slab for soc_id ${soc_id}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newSlab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCharge,
  getAllCharges,
  getChargeById,
  updateCharge,
  deleteCharge,
  createNewSlab,
  getAllSoc
};
