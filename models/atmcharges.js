const { Sequelize, DataTypes } = require('sequelize');

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});
 
// Define the Role model with explicit table name
const Atm = sequelize.define('atm', { 
    atm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    atm_name: {
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
  tableName: 'atm_charges'
});

// Export the Role model
module.exports = Atm;
