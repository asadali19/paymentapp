const Industry = require('../models/industry'); // Adjust the path as necessary
const ActivityLog =  require('../models/activity');

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

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new Industry ${newIndustry.industry_name}`,
      created_by: user.id,
      createdAt:new Date(),
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
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the industry  ${industry.industry_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

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
     
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the industry  ${updatedIndustry.industry_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

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
    const industry = await Industry.findOne({ where: { industry_id: id } }); 
    
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the industry ${industry.industry_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

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
