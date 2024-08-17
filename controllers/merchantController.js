// merchantController.js
const Merchant = require('../models/merchant');
const SubGroup = require('../models/subgroup'); 
const City = require('../models/cities'); 
const Introducer = require('../models/introducer'); 
const Industry = require('../models/industry');
const Channel = require('../models/channel');  
const ActivityLog = require('../models/activity')

// Create a new merchant
const createMerchant = async (req, res) => {
  try {
    const {
      business_name,
      brand_name,
      owner_name,
      contact_info,
      business_status,
      business_type,
      business_email,
      business_address,
      city_id,
      business_age,
      ntn,
      poc_name,
      poc_designation,
      poc_contact,
      industry_id,
      channel_id,
      introducer_id,
      outlets,
      pos,
      transaction_perday,
      transaction_volume,
      checkouts,
      outlet_owner,
      ctm,
      account_no,
      bank_name,
      account_title,
      deployment,
      subgroup_id,
    } = req.body;

    console.log(req.body);

    const newMerchant = await Merchant.create({
      business_name,
      brand_name,
      owner_name,
      contact_info,
      business_status,
      business_type,
      business_email,
      business_address,
      city_id,
      business_age,
      ntn,
      poc_name,
      poc_designation,
      poc_contact,
      industry_id,
      channel_id,
      introducer_id,
      outlets,
      pos,
      transaction_perday,
      transaction_volume,
      checkouts,
      outlet_owner,
      ctm,
      account_no,
      bank_name,
      account_title,
      deployment,
      subgroup_id,
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new merchant ${newMerchant.business_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
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
      include: [
        {
          model: SubGroup,
          attributes: ['subgroup_name'],
          required: false
        },
        {
          model: City,
          attributes: ['city_name'],
          required: false
        },
        {
          model: Introducer,
          attributes: ['introducer_name'],
          required: false
        },
        {
          model: Channel,
          attributes: ['channel_name'],
          required: false
        },
        {
          model: Industry,
          attributes: ['industry_name'],
          required: false
        }
      ]
    });

    // Map merchants to include all associated names directly in the response
    const merchantsWithDetails = merchants.map(merchant => {
      const {
        SubGroup,
        City,
        Introducer,
        Channel,
        Industry,
        ...merchantData
      } = merchant.dataValues;
      return {
        ...merchantData,
      };
    });

    res.status(200).json({ message: 'Merchants retrieved successfully', data: merchantsWithDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single merchant by ID
const getMerchantById = async (req, res) => {
  try {
    const { id } = req.params;
    const merchant = await Merchant.findByPk(id, {
      include: [
        {
          model: SubGroup,
          attributes: ['subgroup_name'],
          required: false
        },
        {
          model: City,
          attributes: ['city_name'],
          required: false
        },
        {
          model: Introducer,
          attributes: ['introducer_name'],
          required: false
        },
        {
          model: Channel,
          attributes: ['channel_name'],
          required: false
        },
        {
          model: Industry,
          attributes: ['industry_name'],
          required: false
        }
      ]
    });

    if (!merchant) {
      return res.status(404).json({ message: 'Merchant not found' });
    }

    // Extract associated data and merchant data
    const {
      SubGroup: subgroup,
      City: city,
      Introducer: introducer,
      Channel: channel,
      Industry: industry,
      ...merchantData
    } = merchant.dataValues;

    const merchantWithDetails = {
      ...merchantData
    };

    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the merchant ${merchant.name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Merchant retrieved successfully', data: merchantWithDetails });
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

    // Activity log
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the merchant  ${updatedMerchant.name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

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
    const merchant = await Merchant.findOne({ where: { merchant_id: id } }); 
    
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the merchant ${merchant.name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

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
