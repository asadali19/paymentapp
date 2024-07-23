const { Sequelize, DataTypes } = require("sequelize");
const Subgroup = require('./subgroup')

// Initialize sequelize
const sequelize = new Sequelize("paymentapp", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

// Define the Merchant model with explicit table name
const Merchant = sequelize.define(
  "merchant",
  {
    // <-- Specify table name without pluralization
    merchant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subgroup_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Subgroup,
        key: 'subgroup_id'
      }
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    business_name: {
      type: DataTypes.STRING,
    },
    address: {
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
    },
  },
  {
    tableName: "merchant",
  }
);
Merchant.belongsTo(Subgroup, { foreignKey: 'subgroup_id' });
// Export the Merchant model
module.exports = Merchant;
