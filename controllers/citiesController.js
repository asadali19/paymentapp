const Cities = require('../models/cities'); // Adjust the path as necessary

const ActivityLog = require('../models/activity');

// Create a new city
const createCity = async (req, res) => {
  try {
    const { city_name = null, status = null, code = null, region_id = null } = req.body;

    const newCity = await Cities.create({
      city_name,
      code,
      region_id,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new city ${newCity.city_name}`,
      created_by: user.id,
      createdAt:new Date(),
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
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the city ${deleted.city_name}`,
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
