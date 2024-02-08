"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Yunit = require("./YunitModel");
var Sprofile = require("./SprofileModel");
var CompletedUnit = sequelize.define("CompletedUnit", {
  starRating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  yunitId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});
CompletedUnit.belongsTo(Yunit, {
  foreignKey: "yunitId",
  onDelete: "CASCADE"
});
CompletedUnit.belongsTo(Sprofile, {
  foreignKey: "studentProfileId",
  onDelete: "CASCADE"
});
module.exports = CompletedUnit;