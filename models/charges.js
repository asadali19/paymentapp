const { Sequelize, DataTypes } = require('sequelize');
const Merchant = require('./merchant'); // Adjust the path as necessary

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Terminal model with explicit table name
const Charges = sequelize.define('charges', { // <-- Specify table name without pluralization
    charges_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
    type: DataTypes.STRING
  },
  rangeamount: {
    type: DataTypes.STRING,
  },
  percentage: {
    type: DataTypes.STRING,
    
  },
  fixedamount: {
    type: DataTypes.STRING,
    
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
  tableName: 'charges' 
});

// Set up the association
Charges.belongsTo(Merchant, { foreignKey: 'merchant_id' });

// Export the Terminal model
module.exports = Charges;
