"use strict";

var _require = require("sequelize"),
  Sequelize = _require.Sequelize;
require("dotenv").config();
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 120000
  }
});
module.exports = sequelize;