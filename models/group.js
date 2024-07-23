const { Sequelize, DataTypes } = require('sequelize');
const Merchant = require('./merchant'); // Adjust the path as necessary

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Role model with explicit table name
const Group = sequelize.define('group', { 
    group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    group_name: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'group' 
});

// Export the Role model
module.exports = Group;
