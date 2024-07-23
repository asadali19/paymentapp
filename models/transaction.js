const { Sequelize, DataTypes } = require('sequelize');
const Merchant = require('./merchant'); 
const Terminal = require('./terminal'); 

// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Transaction model with explicit table name
const Transaction = sequelize.define('transaction', { 
    trans_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    amount: {
    type: DataTypes.STRING
  },
  reference_no: {
    type: DataTypes.STRING
  },
  trans_status: {
    type: DataTypes.STRING,
  },
  trans_type: {
    type: DataTypes.STRING,
  },
  card_no: {
    type: DataTypes.STRING,
  },

  terminal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Terminal,
      key: 'terminal_id'
    }
  },

  merchant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Merchant,
      key: 'merchant_id'
    }
  },

  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'transaction' 
});

// Set up the association
Transaction.belongsTo(Merchant, { foreignKey: 'merchant_id' });
Transaction.belongsTo(Terminal, { foreignKey: 'terminal_id' });

// Export the Terminal model
module.exports = Transaction;
