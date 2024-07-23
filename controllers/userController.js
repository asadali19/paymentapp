const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path as necessary

// Register a new user
const registerUser = async (req, res) => {
  try {
    const {
      first_name = null,
      last_name = null,
      username,
      phone = null,
      email = null,
      password = null,
      address = null,
      status = null,
      role_id= null,
      subgroup_id
    } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      phone,
      email,
      password: hashedPassword,
      address,
      status,
      role_id,
      subgroup_id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET);
    await newUser.update({ token }); // <-- Update token field directly on the instance

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
    await user.update({ token }); // <-- Update token field directly on the instance

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name = null,
      last_name = null,
      username,
      phone = null,
      email = null,
      password = null,
      address = null,
      status = null,
      role_id = null,
      subgroup_id
    } = req.body;

    const updatedFields = {
      first_name,
      last_name,
      username,
      phone,
      email,
      address,
      status,
      role_id,
      subgroup_id,
      updatedAt: new Date()
    };

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    const [updated] = await User.update(updatedFields, {
      where: { user_id: id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.findByPk(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { user_id: id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
