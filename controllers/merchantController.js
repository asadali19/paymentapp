// merchantController.js
const Merchant = require('../models/merchant');
const SubGroup = require('../models/subgroup'); 

// Create a new merchant
const createMerchant = async (req, res) => {
  try {
    const { name, phone, email, business_name, address, subgroup_id,status } = req.body;
    console.log(req.body);
    const newMerchant = await Merchant.create({
      name,
      phone,
      email,
      business_name,
      address,
      status,
      subgroup_id
    });
    res.status(201).json(newMerchant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all merchants
const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.findAll({
      include: [{
        model: SubGroup,
        attributes: ['subgroup_name'], 
        required: false 
      }]
    });

    // Map merchants to include subgroup name directly in the response
    const merchantsWithSubgroupName = merchants.map(merchant => {
      const { Subgroup, ...merchantData } = merchant.dataValues;
      return {
        ...merchantData
      };
    });

    res.status(200).json({ message: 'Merchants retrieved successfully', data: merchantsWithSubgroupName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single merchant by ID
const getMerchantById = async (req, res) => {
  try {
    const { id } = req.params;
    const merchant = await Merchant.findByPk(id, {
      include: [{
        model: SubGroup,
        attributes: ['subgroup_name'], 
        required: false // Include merchants even if they do not have a subgroup
      }]
    });

    if (!merchant) {
      return res.status(404).json({ message: 'Merchant not found' });
    }

    const { Subgroup, ...merchantData } = merchant.dataValues;
    const merchantWithSubgroupName = {
      ...merchantData
    };

    res.status(200).json({ message: 'Merchant retrieved successfully', data: merchantWithSubgroupName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a merchant by ID
const updateMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // Dynamically add fields to updateData if they are provided in the request body
    const fields = ['name', 'phone', 'email', 'business_name', 'address', 'subgroup_id', 'status'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const [updated] = await Merchant.update(updateData, {
      where: { merchant_id : id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Merchant not found' });
    }

    const updatedMerchant = await Merchant.findByPk(id);
    res.status(200).json(updatedMerchant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a merchant by ID
const deleteMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Merchant.destroy({
      where: {merchant_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Merchant not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMerchant,
  getAllMerchants,
  getMerchantById,
  updateMerchant,
  deleteMerchant
};
