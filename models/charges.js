const { Sequelize, DataTypes } = require('sequelize');
const Terminal = require('./terminal'); // Adjust the path as necessary
const SocName = require('./soc_name');

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
      soc_id: {
        type: DataTypes.INTEGER,
        references: {
          model: SocName,
          key: 'soc_id'
        }
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

Charges.belongsTo(SocName, { foreignKey: 'soc_id' });

// Export the Terminal model
module.exports = Charges;
