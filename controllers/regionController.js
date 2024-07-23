const Region = require('../models/region');
const City = require('../models/cities'); // Adjust the path as necessary

// Create a new region
const createRegion = async (req, res) => {
  try {
    const {
      region_name = null,
      status = null,
      code = null,
    } = req.body;

    if (!region_name || !status) {
      return res.status(400).json({ error: 'region_name and status are required' });
    }

    const newRegion = await Region.create({
      region_name,
      status,
      code,
      createdAt: new Date(),
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
    res.status(200).json({ message: 'Region retrieved successfully', data: region });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCityById = async (req, res) => {
  try {
    const { region_id } = req.params;
    const cities = await City.findAll({
      where: {
        region_id: region_id
      }
    });

    if (cities.length === 0) {
      return res.status(404).json({ error: 'No cities found for this region' });
    }

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
      code = null
    } = req.body;

    if (!region_name || !status) {
      return res.status(400).json({ error: 'region_name and status are required' });
    }

    const updatedFields = {
      region_name,
      status,
      code,
      updatedAt: new Date()
    };

    const [updated] = await Region.update(updatedFields, {
      where: { region_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Region not found' });
    }

    const updatedRegion = await Region.findByPk(id);
    res.status(200).json({ message: 'Region updated successfully', data: updatedRegion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a region by ID
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Region.destroy({
      where: { region_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Region not found' });
    }
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
