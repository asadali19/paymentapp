const { Sequelize, DataTypes } = require('sequelize');
const Merchant = require('./merchant'); // Adjust the path as necessary

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Terminal model with explicit table name
const Terminal = sequelize.define('terminal', { // <-- Specify table name without pluralization
    terminal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    terminal_sn: {
    type: DataTypes.STRING
  },
  serial_no: {
    type: DataTypes.STRING
  },
  unique_terminal: {
    type: DataTypes.STRING
  },
  product_key: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  merchant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Merchant,
      key: 'merchant_id'
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
  tableName: 'terminal' 
});

// Set up the association
Terminal.belongsTo(Merchant, { foreignKey: 'merchant_id' });

// Export the Terminal model
module.exports = Terminal;
