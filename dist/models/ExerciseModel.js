"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Lesson = require("./LessonModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var Exercise = sequelize.define("Exercise", {
  exerciseId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  exerciseNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exerciseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exerciseDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Exercise.belongsTo(Lesson, {
  foreignKey: "lessonId",
  onDelete: "CASCADE"
});
module.exports = Exercise;