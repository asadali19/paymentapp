const Subgroup = require('../models/subgroup'); // Adjust the path as necessary
const Group = require('../models/group'); // Adjust the path as necessary
const ActivityLog =  require('../models/activity');

// Create a new subgroup
const createSubgroup = async (req, res) => {
  try {
    const {
      subgroup_name = null,
      group_id = null,
      status = null,
      code = null
    } = req.body;

    const newSubgroup = await Subgroup.create({
      subgroup_name,
      group_id,
      status,
      code,
      createdAt: new Date(),
      updatedAt: new Date()
    });
     
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new subgroup ${newSubgroup.subgroup_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Subgroup created successfully', data: newSubgroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subgroups
const getAllSubgroups = async (req, res) => {
  try {
    const subgroups = await Subgroup.findAll({
      include: [{ model: Group, attributes: ['group_name'] }]
    });
    res.status(200).json({ message: 'Subgroups retrieved successfully', data: subgroups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single subgroup by ID
const getSubgroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const subgroup = await Subgroup.findByPk(id, {
      include: [{ model: Group, attributes: ['group_name'] }]
    });
    if (!subgroup) {
      return res.status(404).json({ error: 'Subgroup not found' });
    }
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the subgroup ${subgroup.subgroup_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Subgroup retrieved successfully', data: subgroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subgroup by ID
const updateSubgroup = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // Dynamically add fields to updateData if they are provided in the request body
    const fields = ['subgroup_name', 'group_id', 'status', 'code'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    updateData.updatedAt = new Date();

    const [updated] = await Subgroup.update(updateData, {
      where: { subgroup_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Subgroup not found' });
    }

    const updatedSubgroup = await Subgroup.findByPk(id, {
      include: [{ model: Group, attributes: ['group_name'] }]
    });
    
    // Activity log
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the Subgroup  ${updatedSubgroup.subgroupname}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Subgroup updated successfully', data: updatedSubgroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a subgroup by ID
const deleteSubgroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Subgroup.destroy({
      where: { subgroup_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Subgroup not found' });
    }
    
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the subgroup ${deleted.subgroup_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(204).json({ message: 'Subgroup deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubgroup,
  getAllSubgroups,
  getSubgroupById,
  updateSubgroup,
  deleteSubgroup
};
