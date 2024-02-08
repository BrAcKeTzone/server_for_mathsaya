"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../config/sequelize");
var Exercise = require("./ExerciseModel");
var _require2 = require("uuid"),
  uuidv4 = _require2.v4;
var Question = sequelize.define("Question", {
  questionId: {
    type: DataTypes.UUID,
    defaultValue: function defaultValue() {
      return uuidv4();
    },
    primaryKey: true
  },
  question_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questionImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  answer_choices: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exerciseId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});
Question.belongsTo(Exercise, {
  foreignKey: "exerciseId",
  onDelete: "CASCADE"
});
module.exports = Question;