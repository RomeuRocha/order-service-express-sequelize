const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes


db.clients = require("./entities/client.model.js")(sequelize, DataTypes);
db.orders = require("./entities/order.model")(sequelize, DataTypes);
db.services = require('./entities/service.model')(sequelize, DataTypes);
db.itemServices = require('./entities/itemService.model')(sequelize, DataTypes);
db.products = require('./entities/product.model')(sequelize, DataTypes);
db.itemProducts = require('./entities/itemProduct.model')(sequelize, DataTypes);
db.devices = require('./entities/device.model')(sequelize, DataTypes);
db.equipments = require('./entities/equipment.model')(sequelize, DataTypes);

//relations client for order (1:n)
db.clients.hasMany(db.orders)
db.orders.belongsTo(db.clients)

//relation order for service (n : n)
db.services.hasMany(db.itemServices)
db.itemServices.belongsTo(db.services)

db.orders.hasMany(db.itemServices)
db.itemServices.belongsTo(db.orders)

//relation order for product (n:n)
db.products.hasMany(db.itemProducts)
db.itemProducts.belongsTo(db.products)

db.orders.hasMany(db.itemProducts)
db.itemProducts.belongsTo(db.orders)

//relations order for equipment
db.equipments.hasOne(db.orders)
db.orders.belongsTo(db.equipments)

//relations device for equipment
db.devices.hasOne(db.equipments)
db.equipments.belongsTo(db.devices)

module.exports = db;