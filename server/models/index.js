const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Client = sequelize.define('client', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  secondName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  bDate: { type: DataTypes.STRING, allowNull: false },
});

const Auto = sequelize.define('auto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  regNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  year: { type: DataTypes.STRING, allowNull: false },
});

const AutoClient = sequelize.define('auto_client', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CarModel = sequelize.define('car_model', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const CarBrand = sequelize.define('car_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const BrandModel = sequelize.define('brand_model', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Payment = sequelize.define('payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  summ: { type: DataTypes.FLOAT,  allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
});

const Place = sequelize.define('place', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  price: { type: DataTypes.INTEGER,  allowNull: true },
  isVacant: { type: DataTypes.BOOLEAN, defaultValue: true},
  startDate: { type: DataTypes.STRING, allowNull: true }
});



Auto.hasOne(Place);
Place.belongsTo(Auto);

BrandModel.hasOne(Auto);
Auto.belongsTo(BrandModel);

CarModel.belongsToMany(CarBrand, { through: BrandModel });
CarBrand.belongsToMany(CarModel, { through: BrandModel });

Client.hasMany(Payment);
Payment.belongsTo(Client);

Client.belongsToMany(Auto, { through: AutoClient });
Auto.belongsToMany(Client, { through: AutoClient });

Place.hasMany(Payment);
Payment.belongsTo(Place);



module.exports = {
  Client,
  Auto,
  CarModel,
  CarBrand,
  BrandModel,
  AutoClient

};
