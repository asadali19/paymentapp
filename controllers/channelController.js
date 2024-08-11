const Channel = require('../models/channel'); // Adjust the path as necessary
const ActivityLog = require('../models/activity');

// Create a new channel
const createChannel = async (req, res) => {
  try {
    const { channel_name = null, status = null, soc_id = null } = req.body;

    // Get the last inserted channel and increment the code by 1
    const lastChannel = await Channel.findOne({ 
      order: [['channel_id', 'DESC']]  // Assuming 'id' is the primary key
    });

    let newCode = '01'; // Default code if no channels exist

    if (lastChannel) {
      // Increment the last code by 1
      const lastCode = parseInt(lastChannel.code);
      newCode = (lastCode + 1).toString().padStart(3, '0');
    }

    const newChannel = await Channel.create({
      channel_name,
      code: newCode,
      soc_id,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} created the new channel ${newChannel.channel_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'Channel created successfully', data: newChannel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Channel
const getAllChannel = async (req, res) => {
  try {
    const countries = await Channel.findAll();
    res.status(200).json({ message: 'Countries retrieved successfully', data: countries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single channel by ID
const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'channel not found' });
    }
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} viewed the channel  ${channel.channel_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });
    res.status(200).json({ message: 'channel retrieved successfully', data: channel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a channel by ID
const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { channel_name = null, status = null, code = null , soc_id = null } = req.body;

    const updatedFields = {
      channel_name,
      soc_id,
      code,
      status,
      updatedAt: new Date()
    };

    const [updated] = await Channel.update(updatedFields, {
      where: { channel_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'channel not found' });
    }

    const updatedchannel = await Channel.findByPk(id);
    
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has updated the channel  ${updatedchannel.channel_name}`,
      created_by: user.id,
      createdAt:new Date(),
      updatedAt: new Date()
    });
    res.status(200).json({ message: 'channel updated successfully', data: updatedchannel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a channel by ID
const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Channel.destroy({
      where: { channel_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'channel not found' });
    }
    const channel = await Channel.findOne({ where: { channel_id: id } }); 
    const { user } = req;
    await ActivityLog.create({
      activity_name: `User ${user.username} has deleted the channel ${channel.channel_name}`,
      created_by: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(204).json({ message: 'channel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChannel,
  getAllChannel,
  getChannelById,
  updateChannel,
  deleteChannel
};
