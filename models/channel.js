const { Sequelize, DataTypes } = require('sequelize');

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});
 
// Define the Role model with explicit table name
const Channel = sequelize.define('channel', { 
    channel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    channel_name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.INTEGER,
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
  tableName: 'channel' 
});

// Export the Role model
module.exports = Channel;
