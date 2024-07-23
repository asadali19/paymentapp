const Channel = require('../models/channel'); // Adjust the path as necessary

// Create a new channel
const createChannel = async (req, res) => {
  try {
    const { channel_name = null, status = null, code = null } = req.body;

    const newchannel = await Channel.create({
      channel_name,
      code,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({ message: 'channel created successfully', data: newchannel });
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
    res.status(200).json({ message: 'channel retrieved successfully', data: channel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a channel by ID
const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { channel_name = null, status = null, code = null } = req.body;

    const updatedFields = {
      channel_name,
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
