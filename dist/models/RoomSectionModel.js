"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var User = require("./UserModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var RoomSection = sequelize.define("RoomSection", {
  sectionId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  sectionName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  schoolYear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalStudents: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
RoomSection.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
module.exports = RoomSection;