const Mop = require('../models/mop'); // Adjust the path as necessary
const ActivityLog = require('../models/activity');

// Create a new mop
const createMop = async (req, res) => {
  try {
    const { mop_name = null, status = null } = req.body;

    const newMop = await Mop.create({
      mop_name,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new mop ${newMop.mop_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Mop created successfully', data: newMop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all mops
const getAllMops = async (req, res) => {
  try {
    const mops = await Mop.findAll();
    res.status(200).json({ message: 'Mops retrieved successfully', data: mops });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single mop by ID
const getMopById = async (req, res) => {
  try {
    const { id } = req.params;
    const mop = await Mop.findByPk(id);
    if (!mop) {
      return res.status(404).json({ error: 'Mop not found' });
    }

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the mop ${mop.mop_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Mop retrieved successfully', data: mop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a mop by ID
const updateMop = async (req, res) => {
  try {
    const { id } = req.params;
    const { mop_name = null, status = null } = req.body;

    const updatedFields = {
      mop_name,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Mop.update(updatedFields, {
      where: { mop_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Mop not found' });
    }

    const updatedMop = await Mop.findByPk(id);

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the mop ${updatedMop.mop_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Mop updated successfully', data: updatedMop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a mop by ID
const deleteMop = async (req, res) => {
  try {
    const { id } = req.params;
    const mop = await Mop.findByPk(id);
    if (!mop) {
      return res.status(404).json({ error: 'Mop not found' });
    }
    await mop.destroy();
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the mop ${mop.mop_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'Mop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMop,
  getAllMops,
  getMopById,
  updateMop,
  deleteMop
};
