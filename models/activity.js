const { Sequelize, DataTypes } = require('sequelize');

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});
 
// Define the Role model with explicit table name
const Activity = sequelize.define('activity_logs', { 
    activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    activity_name: {
    type: DataTypes.STRING
  },

  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  created_by: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'activity_logs' 
});

// Export the Role model
module.exports = Activity;
