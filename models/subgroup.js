const { Sequelize, DataTypes } = require('sequelize');
const Group = require('../models/group')
const Merchant = require('./merchant'); // Adjust the path as necessary

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Role model with explicit table name
const Subgroup = sequelize.define('subgroup', { 
    subgroup_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    subgroup_name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  },
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'group_id'
    }
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
  tableName: 'subgroup' 
});

Subgroup.belongsTo(Group, { foreignKey: 'group_id' });

// Export the Role model
module.exports = Subgroup;
