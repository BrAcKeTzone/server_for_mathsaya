"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var User = require("./UserModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var Yunit = sequelize.define("Yunit", {
  yunitId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  yunitNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  yunitName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yunitThumbnail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Yunit.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
module.exports = Yunit;