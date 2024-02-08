"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Yunit = require("./YunitModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var Lesson = sequelize.define("Lesson", {
  lessonId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  lessonNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lessonName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lessonDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lessonThumbnail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  public_id_thumbnail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lessonVideo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  public_id_video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  yunitId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Lesson.belongsTo(Yunit, {
  foreignKey: "yunitId",
  onDelete: "CASCADE"
});
module.exports = Lesson;