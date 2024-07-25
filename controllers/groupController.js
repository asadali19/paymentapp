const Group = require('../models/group'); // Adjust the path as necessary
const ActivityLog = require('../models/activity');

// Create a new group
const createGroup = async (req, res) => {
  try {
    const {
      group_name = null,
      status = null
    } = req.body;

    const newGroup = await Group.create({
      group_name,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
   const log= await ActivityLog.create({
      activity_name: `User ${user.username} created the new group ${newGroup.group_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });  

    console.log(log);

    res.status(201).json({ message: 'Group created successfully', data: newGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json({ message: 'Groups retrieved successfully', data: groups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single group by ID
const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the group ${group.group_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });
    res.status(200).json({ message: 'Group retrieved successfully', data: group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a group by ID
const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      group_name = null,
      status = null
    } = req.body;

    const updatedFields = {
      group_name,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Group.update(updatedFields, {
      where: { group_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const updatedGroup = await Group.findByPk(id);
     
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the group  ${updatedGroup.group_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Group updated successfully', data: updatedGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a group by ID
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Group.destroy({
      where: { group_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the group ${deleted.group_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup
};
