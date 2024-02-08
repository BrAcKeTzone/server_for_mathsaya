"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Exercise = require("./ExerciseModel");
var Sprofile = require("./SprofileModel");
var CompletedExercise = sequelize.define("CompletedExercise", {
  starRating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  completionTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  exerciseId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  attempts: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});
CompletedExercise.belongsTo(Exercise, {
  foreignKey: "exerciseId",
  onDelete: "CASCADE"
});
CompletedExercise.belongsTo(Sprofile, {
  foreignKey: "studentProfileId",
  onDelete: "CASCADE"
});
module.exports = CompletedExercise;