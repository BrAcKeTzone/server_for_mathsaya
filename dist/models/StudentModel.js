"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var RoomSection = require("./RoomSectionModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var Student = sequelize.define("Student", {
  studentId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sectionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileId: {
    type: DataTypes.UUID
  }
});
Student.belongsTo(RoomSection, {
  foreignKey: "sectionId",
  onDelete: "CASCADE"
});
module.exports = Student;