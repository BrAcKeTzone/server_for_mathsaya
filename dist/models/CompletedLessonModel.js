"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Lesson = require("./LessonModel");
var Sprofile = require("./SprofileModel");
var CompletedLesson = sequelize.define("CompletedLesson", {
  starRating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});
CompletedLesson.belongsTo(Lesson, {
  foreignKey: "lessonId",
  onDelete: "CASCADE"
});
CompletedLesson.belongsTo(Sprofile, {
  foreignKey: "studentProfileId",
  onDelete: "CASCADE"
});
module.exports = CompletedLesson;