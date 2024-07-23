const { Sequelize, DataTypes } = require('sequelize');
const Role = require('../models/role')
const Subgroup = require('./subgroup')
// Initialize sequelize
const sequelize = new Sequelize('paymentapp', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Merchant model with explicit table name
const User = sequelize.define('user', { // <-- Specify table name without pluralization
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Role,
          key: 'role_id'
        }
      },
    first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  subgroup_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Subgroup,
      key: 'subgroup_id'
    }
  },
  address: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'user' 
});

User.belongsTo(Role, { foreignKey: 'role_id' });
User.belongsTo(Subgroup, { foreignKey: 'subgroup_id' });
// Export the Merchant model
module.exports = User;
