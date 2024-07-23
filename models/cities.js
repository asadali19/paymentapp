const { Sequelize, DataTypes } = require('sequelize');
const Region = require('../models/region')

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Role model with explicit table name
const Cities = sequelize.define('cities', { 
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    city_name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING,
  },
  region_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Region,
      key: 'region_id'
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
  tableName: 'cities' 
});
Cities.belongsTo(Region, { foreignKey: 'region_id' });
// Export the Role model
module.exports = Cities;
