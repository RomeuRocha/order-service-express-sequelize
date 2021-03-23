const { Sequelize, DataTypes } = require('sequelize');
require('dotenv/config');
module.exports = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect,
    operatorsAliases: false,
   
    pool: {
      max: parseInt(process.env.POOLMAX),
      min: parseInt(process.env.POOLMIN),
      acquire: parseInt(process.env.POOLACQUIRE),
      idle: parseInt(process.env.POOLIDLE)
    }
  });