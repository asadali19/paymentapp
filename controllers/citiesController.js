const Cities = require('../models/cities'); 
const Regions = require('../models/region'); 
const ActivityLog = require('../models/activity');
const { Op } = require('sequelize');

// Create a new city
const createCity = async (req, res) => {
  try {
    const { city_name = null, status = null, region_id = null } = req.body;

    // Get the region based on the region_id
    const region = await Regions.findByPk(region_id);
    if (!region) {
      return res.status(400).json({ error: 'Invalid region_id' });
    }

    const regionCode = region.code; // Assuming 'code' is a column in the 'region' table
    let newCode;

    if (regionCode =='0') {
    
      
      // Get the highest code starting with '0' across all regions
      const lastCityWithZeroCode = await Cities.findOne({
        where: { code: { [Op.like]: '0%' } },
        order: [['code', 'DESC']] // Order by code to find the highest one
      });
      

      if (lastCityWithZeroCode) {
        // Extract the last two digits of the code
        const lastCode = parseInt(lastCityWithZeroCode.code.slice(1)); // Remove the first digit (which is '0')
        // Increment the last two digits
        const incrementedCode = (lastCode + 1).toString().padStart(2, '0');
        // Concatenate with the region code (which is '0')
        newCode = `0${incrementedCode}`;
      } else {
        // Default to '001' if no cities with a code starting with '0' exist
        newCode = '001';
      }
    } else {
      // Get the last inserted city for this specific region
      const lastCity = await Cities.findOne({ 
        where: { region_id },
        order: [['code', 'DESC']] // Order by code to find the highest one
      });

      if (lastCity) {
        // Extract the last two digits of the code
        const lastCode = parseInt(lastCity.code.slice(1)); // Remove the first digit (region code)
        // Increment the last two digits
        const incrementedCode = (lastCode + 1).toString().padStart(2, '0');
        // Concatenate with the region code
        newCode = `${regionCode}${incrementedCode}`;
      } else {
        // Default to the first code if no cities exist for this region
        newCode = `${regionCode}01`;
      }
    }

    const newCity = await Cities.create({
      city_name,
      code: newCode,
      region_id,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new city ${newCity.city_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'City created successfully', data: newCity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await Cities.findAll();
    res.status(200).json({ message: 'Cities retrieved successfully', data: cities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single city by ID
const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await Cities.findByPk(id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the city  ${city.city_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'City retrieved successfully', data: city });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a city by ID
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city_name = null, status = null, code = null, region_id = null } = req.body;

    const updatedFields = {
      city_name,
      status,
      region_id,
      code,
      updatedAt: new Date()
    };

    const [updated] = await Cities.update(updatedFields, {
      where: { city_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    const updatedCity = await Cities.findByPk(id);

    // Activity log
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the city  ${updatedCity.city_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'City updated successfully', data: updatedCity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a city by ID
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cities.destroy({
      where: { city_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'City not found' });
    }
    const city = await Cities.findOne({ where: { city_id: id } }); 
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the city ${city.city_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
};
