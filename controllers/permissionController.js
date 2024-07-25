const Permission = require('../models/permission'); // Adjust the path as necessary
const ActivityLog =  require('../models/activity');

// Create a new permission
const createPermission = async (req, res) => {
  try {
    const {
      permission_name = null,
      description = null,
      status = null
    } = req.body;

    const newPermission = await Permission.create({
      permission_name,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });
     
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new permission ${newPermission.permission_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Permission created successfully', data: newPermission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all permissions
const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json({ message: 'Permissions retrieved successfully', data: permissions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single permission by ID
const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the permission ${permission.permission_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Permission retrieved successfully', data: permission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a permission by ID
const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      permission_name = null,
      description = null,
      status = null
    } = req.body;

    const updatedFields = {
      permission_name,
      description,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Permission.update(updatedFields, {
      where: { permission_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    const updatedPermission = await Permission.findByPk(id);
    
    // Activity log
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the permission  ${updatedPermission.permission_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Permission updated successfully', data: updatedPermission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a permission by ID
const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Permission.destroy({
      where: { permission_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    
    // Log activity
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the permission ${deleted.permission_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
};
