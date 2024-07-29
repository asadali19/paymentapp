const Atm = require('../models/atmcharges'); // Adjust the path as necessary
const ActivityLog = require('../models/activity');

// Create a new ATM
const createAtm = async (req, res) => {
  try {
    const { atm_name = null, status = null } = req.body;
    const newAtm = await Atm.create({
      atm_name,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new ATM ${newAtm.atm_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'ATM created successfully', data: newAtm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ATMs
const getAllAtms = async (req, res) => {
  try {
    const atms = await Atm.findAll();
    res.status(200).json({ message: 'ATMs retrieved successfully', data: atms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single ATM by ID
const getAtmById = async (req, res) => {
  try {
    const { id } = req.params;
    const atm = await Atm.findByPk(id);
    if (!atm) {
      return res.status(404).json({ error: 'ATM not found' });
    }

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the ATM ${atm.atm_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'ATM retrieved successfully', data: atm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an ATM by ID
const updateAtm = async (req, res) => {
  try {
    const { id } = req.params;
    const { atm_name = null, status = null } = req.body;

    const updatedFields = {
      atm_name,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Atm.update(updatedFields, {
      where: { atm_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'ATM not found' });
    }

    const updatedAtm = await Atm.findByPk(id);

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the ATM ${updatedAtm.atm_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'ATM updated successfully', data: updatedAtm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an ATM by ID
const deleteAtm = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Atm.destroy({
      where: { atm_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'ATM not found' });
    }

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the ATM with ID ${id}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'ATM deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAtm,
  getAllAtms,
  getAtmById,
  updateAtm,
  deleteAtm
};
