const Role = require('../models/role'); // Adjust the path as necessary

// Create a new role
const createRole = async (req, res) => {
  try {
    const {
      role_name = null,
      permissions = null,
      status = null
    } = req.body;

    const newRole = await Role.create({
      role_name,
      permissions,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Role created successfully', data: newRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({ message: 'Roles retrieved successfully', data: roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json({ message: 'Role retrieved successfully', data: role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a role by ID
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      role_name = null,
      permissions = null,
      status = null
    } = req.body;

    const updatedFields = {
      role_name,
      permissions,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Role.update(updatedFields, {
      where: { role_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const updatedRole = await Role.findByPk(id);
    res.status(200).json({ message: 'Role updated successfully', data: updatedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a role by ID
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Role.destroy({
      where: { role_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(204).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
