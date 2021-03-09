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


db.clients = require("./client.model.js")(sequelize, DataTypes);
db.orders = require("./order.model")(sequelize, DataTypes);
db.services = require('./service.model')(sequelize, DataTypes);
db.itemServices = require('./itemService.model')(sequelize, DataTypes);

//relations client for order (1:n)
db.clients.hasMany(db.orders)
db.orders.belongsTo(db.clients)

//relation order for service (n : n)
db.services.hasMany(db.itemServices)
db.itemServices.belongsTo(db.services)

db.orders.hasMany(db.itemServices)
db.itemServices.belongsTo(db.orders)



module.exports = db;