const { Sequelize, DataTypes } = require("sequelize");
const Subgroup = require('./subgroup');
const City = require('./cities');  // Add missing model imports
const Industry = require('./industry');
const Channel = require('./channel');
const Introducer = require('./introducer');

// Initialize sequelize
const sequelize = new Sequelize("paymentapp", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

// Define the Merchant model with explicit table name
const Merchant = sequelize.define(
  "merchant",
  {
    merchant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    business_name: {  // Corrected typo
      type: DataTypes.STRING,
    },
    brand_name: {
      type: DataTypes.STRING,
    },
    owner_name: {
      type: DataTypes.STRING,
    },
    contact_info: {
      type: DataTypes.STRING,
    },
    business_status: {  // Corrected typo
      type: DataTypes.STRING,
    },
    business_type: {  // Corrected typo
      type: DataTypes.STRING,
    },
    business_email: {  // Corrected typo
      type: DataTypes.STRING,
    },
    business_address: {  // Corrected typo
      type: DataTypes.STRING,
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: City,
        key: 'city_id',
      },
    },
    business_age: {  // Corrected typo
      type: DataTypes.STRING,
    },
    ntn: {  // Corrected typo (lowercase)
      type: DataTypes.STRING,
    },
    poc_name: {  // Corrected typo (lowercase)
      type: DataTypes.STRING,
    },
    poc_designation: {  // Corrected typo (lowercase)
      type: DataTypes.STRING,
    },
    poc_contact: {  // Corrected typo (lowercase)
      type: DataTypes.STRING,
    },
    industry_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Industry,
        key: 'industry_id',
      },
    },
    channel_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Channel,
        key: 'channel_id',
      },
    },
    introducer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Introducer,
        key: 'introducer_id',
      },
    },
    outlets: {
      type: DataTypes.STRING,
    },
    pos: {
      type: DataTypes.STRING,
    },
    transaction_perday: {  // Corrected typo
      type: DataTypes.STRING,
    },
    transaction_volume: {  // Corrected typo (lowercase)
      type: DataTypes.STRING,
    },
    checkouts: {
      type: DataTypes.STRING,
    },
    outlet_owner: {
      type: DataTypes.STRING,
    },
    ctm: {  // Corrected typo (lowercase)
      type: DataTypes.STRING,
    },
    account_no: {
      type: DataTypes.STRING,
    },
    bank_name: {
      type: DataTypes.STRING,
    },
    account_title: {
      type: DataTypes.STRING,
    },
    deployment: {
      type: DataTypes.STRING,
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

// Define associations
Merchant.belongsTo(Subgroup, { foreignKey: 'subgroup_id' });
Merchant.belongsTo(City, { foreignKey: 'city_id' });
Merchant.belongsTo(Industry, { foreignKey: 'industry_id' });
Merchant.belongsTo(Channel, { foreignKey: 'channel_id' });
Merchant.belongsTo(Introducer, { foreignKey: 'introducer_id' });

// Export the Merchant model
module.exports = Merchant;
