"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var User = require("../models/UserModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var EmailToAdmin = sequelize.define("EmailToAdmin", {
  emailId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  teacherEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});
EmailToAdmin.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
module.exports = EmailToAdmin;