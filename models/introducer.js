const { Sequelize, DataTypes } = require('sequelize');

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});
 
// Define the Role model with explicit table name
const Introducer = sequelize.define('introducer', { 
    introducer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    introducer_name: {
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
  tableName: 'introducer'
});

// Export the Role model
module.exports = Introducer;
