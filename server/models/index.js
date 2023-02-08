const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Client = sequelize.define('client', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  second_name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  birth_date: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  Client,
};
