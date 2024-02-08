"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Student = require("./StudentModel");
var Sprofile = sequelize.define("Sprofile", {
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  firstLoginDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  loginDates: {
    type: DataTypes.STRING,
    allowNull: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Sprofile.belongsTo(Student, {
  foreignKey: "studentId",
  onDelete: "CASCADE"
});
module.exports = Sprofile;