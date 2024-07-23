const { Sequelize, DataTypes } = require('sequelize');

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Industry model with explicit table name
const Industry = sequelize.define('industry', { 
  industry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  industry_name: {
    type: DataTypes.STRING
  },
  code: {
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
  tableName: 'industry' 
});

// Export the Industry model
module.exports = Industry;
