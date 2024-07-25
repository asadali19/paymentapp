const Terminal = require('../models/terminal');
const Merchants = require('../models/merchant');
const ActivityLog =  require('../models/activity');

const Channel = require('../models/channel'); 
const City = require('../models/cities'); 
const Industry = require('../models/industry'); 
const Subgroup = require('../models/subgroup');

// Create a new terminal
const createTerminal = async (req, res) => {
  try {
    const {
      terminal_sn = null,
      product_key = null,
      location = null,
      merchant_id = null,
      status = null,
      channel_id = null,
      city_id = null,
      industry_id = null,
      subgroup_id = null
    } = req.body;

    // Fetch all the entities
    const channel = await Channel.findByPk(channel_id);
    const city = await City.findByPk(city_id);
    const industry = await Industry.findByPk(industry_id);
    const subgroup = await Subgroup.findByPk(subgroup_id);

    // Fetch the last terminal
    const lastTerminal = await Terminal.findOne({
      order: [['terminal_id', 'DESC']]
    });

    // Ensure all entities are found
    if (!channel || !city || !industry || !subgroup) {
      return res.status(404).json({ error: 'One or more entities not found' });
    }

    // Concatenate the code values
    

    // Determine the new serial_no
    const lastSerialNo = lastTerminal ? parseInt(lastTerminal.serial_no, 10) : 0;
    const newSerialNo = (lastSerialNo + 1).toString().padStart(5, '0');

    const concatenatedCodes = `${channel.code}${city.code}${industry.code}${subgroup.code}${newSerialNo}`;

    // Create the new Terminal with the concatenated codes as serial_no
    const newTerminal = await Terminal.create({
      terminal_sn,
      product_key,
      location,
      merchant_id,
      serial_no: newSerialNo, // Padded serial_no
      unique_terminal: concatenatedCodes, // Save the concatenated codes
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });
     
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new terminal ${newTerminal.terminal_sn}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newTerminal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all terminals
const getAllTerminals = async (req, res) => {
  try {
    const terminals = await Terminal.findAll({
      include: [{
        model: Merchants,
        attributes: ['name'], // Specify the attributes you want from the Merchant model
        required: true // Ensures only terminals with an associated merchant are returned
      }]
    });

    const terminalsWithMerchantName = terminals.map(terminal => {
      const { Merchant, ...terminalData } = terminal.dataValues;
      return {
        ...terminalData
      };
    });

    res.status(200).json(terminalsWithMerchantName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single terminal by ID
const getTerminalById = async (req, res) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByPk(id, {
      include: [{
        model: Merchants,
        attributes: ['name'],
        required: true
      }]
    });

    if (!terminal) {
      return res.status(404).json({ error: 'Terminal not found' });
    }

    const { Merchant, ...terminalData } = terminal.dataValues;
    const terminalWithMerchantName = {
      ...terminalData
    };
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the terminal  ${terminal.terminal_sn}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });


    res.status(200).json(terminalWithMerchantName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a terminal by ID
const updateTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      terminal_sn = null,
      product_key = null,
      location = null,
      serial_no = null,
      merchant_id = null,
      status = null
    } = req.body;

    const updatedFields = {
      terminal_sn,
      product_key,
      location,
      merchant_id,
      serial_no,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Terminal.update(updatedFields, {
      where: { terminal_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Terminal not found' });
    }

    const updatedTerminal = await Terminal.findByPk(id);
    
    // Activity log
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated theTerinal ${updatedTerminal.terminal_sn}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });
    res.status(200).json(updatedTerminal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a terminal by ID
const deleteTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Terminal.destroy({
      where: { terminal_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Terminal not found' });
    }
    const terminal = await Terminal.findOne({ where: { terminal_id: id } }); 
    
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the terminal ${terminal.terminal_sn}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'Terminal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTerminal,
  getAllTerminals,
  getTerminalById,
  updateTerminal,
  deleteTerminal
};
