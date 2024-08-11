const Introducer = require('../models/introducer');
const ActivityLog = require('../models/activity');

// Create a new introducer
const createIntroducer = async (req, res) => {
  try {
    const { introducer_name = null, status = null } = req.body;

    let newCode;

    // Get the last inserted introducer code
    const lastIntroducer = await Introducer.findOne({
      order: [['code', 'DESC']] // Order by code to find the latest one
    });

    if (lastIntroducer) {
      // Extract the numeric part of the last code and increment it
      const lastCode = parseInt(lastIntroducer.code, 10); // Assuming code is numeric
      const incrementedCode = (lastCode + 1).toString().padStart(2, '0'); // Pad with zeros if needed
      newCode = incrementedCode;
    } else {
      // Default to '01' if no introducers exist
      newCode = '01';
    }

    // Create the new introducer with the incremented code
    const newIntroducer = await Introducer.create({
      introducer_name,
      code: newCode,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new introducer ${newIntroducer.introducer_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Introducer created successfully', data: newIntroducer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all introducers
const getAllIntroducers = async (req, res) => {
  try {
    const introducers = await Introducer.findAll();
    res.status(200).json({ message: 'Introducers retrieved successfully', data: introducers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single introducer by ID
const getIntroducerById = async (req, res) => {
  try {
    const { id } = req.params;
    const introducer = await Introducer.findByPk(id);
    if (!introducer) {
      return res.status(404).json({ error: 'Introducer not found' });
    }

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the introducer ${introducer.introducer_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Introducer retrieved successfully', data: introducer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an introducer by ID
const updateIntroducer = async (req, res) => {
  try {
    const { id } = req.params;
    const { introducer_name = null, status = null, code = null } = req.body;

    const updatedFields = {
      introducer_name,
      status,
      code,
      updatedAt: new Date()
    };

    const [updated] = await Introducer.update(updatedFields, {
      where: { introducer_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Introducer not found' });
    }

    const updatedIntroducer = await Introducer.findByPk(id);

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the introducer ${updatedIntroducer.introducer_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Introducer updated successfully', data: updatedIntroducer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an introducer by ID
const deleteIntroducer = async (req, res) => {
  try {
    const { id } = req.params;
    const introducer = await Introducer.findByPk(id);
    if (!introducer) {
      return res.status(404).json({ error: 'Introducer not found' });
    }
    await introducer.destroy();
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the introducer ${introducer.introducer_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(204).json({ message: 'Introducer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIntroducer,
  getAllIntroducers,
  getIntroducerById,
  updateIntroducer,
  deleteIntroducer
};
