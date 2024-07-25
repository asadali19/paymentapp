const Region = require('../models/region');
const City = require('../models/cities'); // Adjust the path as necessary
const ActivityLog =  require('../models/activity');

// Create a new region
const createRegion = async (req, res) => {
  try {
    const {
      region_name = null,
      status = null,
      code = null,
      fed_per = null,
    } = req.body;

    if (!region_name || !status) {
      return res.status(400).json({ error: 'region_name and status are required' });
    }

    const newRegion = await Region.create({
      region_name,
      status,
      code,
      fed_per,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new region  ${newRegion.region_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Region created successfully', data: newRegion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all regions
const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.status(200).json({ message: 'Regions retrieved successfully', data: regions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single region by ID
const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).json({ error: 'Region not found' });
    }
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the region  ${region.region_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });
    res.status(200).json({ message: 'Region retrieved successfully', data: region });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCityById = async (req, res) => {
  try {
    const { region_id } = req.params;
    const { user } = req; // Assuming user info is attached to the req object after authentication

    const cities = await City.findAll({
      where: {
        region_id: region_id
      }
    });

    const region = await Region.findByPk(region_id);
    if (!region) {
      return res.status(404).json({ error: 'Region not found' });
    }

    await ActivityLog.create({
      activity_name: `User ${user.username} viewed cities for region Name ${region.region_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Cities retrieved successfully', data: cities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a region by ID
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      region_name = null,
      status = null,
      code = null,
      fed_per = null,
    } = req.body;

    if (!region_name || !status) {
      return res.status(400).json({ error: 'region_name and status are required' });
    }

    const updatedFields = {
      region_name,
      status,
      code,
      fed_per,
      updatedAt: new Date()
    };

    const [updated] = await Region.update(updatedFields, {
      where: { region_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Region not found' });
    }

    const updatedRegion = await Region.findByPk(id);
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the region  ${updatedRegion.region_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });
    res.status(200).json({ message: 'Region updated successfully', data: updatedRegion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a region by ID
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the region using region_id
    const region = await Region.findOne({ where: { region_id: id } });

    if (!region) {
      return res.status(404).json({ error: 'Region not found' });
    }

    // Delete the region
    await Region.destroy({
      where: { region_id: id }
    });

    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the region ${region.region_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(204).json({ message: 'Region deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
  getCityById
};
