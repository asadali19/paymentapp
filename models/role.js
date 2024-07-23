const { Sequelize, DataTypes } = require('sequelize');
const Merchant = require('./merchant'); // Adjust the path as necessary

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Role model with explicit table name
const Role = sequelize.define('role', { 
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    role_name: {
    type: DataTypes.STRING
  },
  permissions: {
    type: DataTypes.JSON
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
  tableName: 'roles' 
});

// Export the Role model
module.exports = Role;
