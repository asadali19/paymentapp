const Industry = require('../models/industry'); // Adjust the path as necessary

// Create a new industry
const createIndustry = async (req, res) => {
  try {
    const { industry_name = null, status = null,code = null } = req.body;

    const newIndustry = await Industry.create({
      industry_name,
      code,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Industry created successfully', data: newIndustry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all industries
const getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.findAll();
    res.status(200).json({ message: 'Industries retrieved successfully', data: industries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single industry by ID
const getIndustryById = async (req, res) => {
  try {
    const { id } = req.params;
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.status(200).json({ message: 'Industry retrieved successfully', data: industry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an industry by ID
const updateIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const { industry_name = null, status = null, code = null } = req.body;

    const updatedFields = {
      industry_name,
      status,
      code,
      updatedAt: new Date()
    };

    const [updated] = await Industry.update(updatedFields, {
      where: { industry_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Industry not found' });
    }

    const updatedIndustry = await Industry.findByPk(id);
    res.status(200).json({ message: 'Industry updated successfully', data: updatedIndustry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an industry by ID
const deleteIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Industry.destroy({
      where: { industry_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.status(204).json({ message: 'Industry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIndustry,
  getAllIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry
};
