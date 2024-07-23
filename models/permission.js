const { Sequelize, DataTypes } = require('sequelize');
const Merchant = require('./merchant'); // Adjust the path as necessary

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Role model with explicit table name
const Permission = sequelize.define('permissions', { 
    permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    permission_name: {
    type: DataTypes.STRING
  },
  description: {
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
  tableName: 'permissions' 
});

// Export the Role model
module.exports = Permission;
